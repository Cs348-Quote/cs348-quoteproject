import psycopg2
import os
import json
from os.path import exists
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
CONNECT_STRING = f"dbname={DB_NAME} user={DB_USER} password={DB_PASS}"

# DEBUG
# print(CONNECT_STRING)

def connect():
    """Connect to the PostgreSQL database server"""
    conn = None
    try:
        conn = psycopg2.connect(CONNECT_STRING)
        print("Successfully connected to db")
        # create a cursor
        cur = conn.cursor()
        
        #prints version
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')


	    # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

def check_login(email, password):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()
    cur.execute("SELECT email, password FROM user_info WHERE email = '" + str(email) + "' and password = '" + str(password)+"'")
    if (cur.rowcount > 0):
        print("Login success!")
        cur.close()
        return "1"
    else:
        print("User or password is incorrect")
        cur.close()
        return "0"

def create_user(name, email, password):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()
    
    #check if user email is unique
    cur.execute("SELECT username FROM user_info WHERE email = '" + str(email) + "'")
    if (cur.rowcount > 0):
        print("Error: Email is not unique!")
        cur.close()
        return "0"

    #checks if username is unique
    cur.execute("SELECT username FROM user_info WHERE username = '" + str(name) +"'")
    if (cur.rowcount > 0):
        print("Error: Username is not unique!")
        cur.close()
        return "0"

    #checks if username is NOT an author name
    cur.execute("SELECT name FROM authors WHERE name = '" + str(name) + "'")
    if (cur.rowcount > 0):
        print("Error: Username is not valid. Please choose a new username.")
        cur.close()
        return "0"
    
    #inserts into authors
    cur.execute("INSERT INTO authors VALUES ('" + name + "', NULL" + ", NULL" + ", NULL" + ", NULL" + ")")

    #inserts into user_info
    # may need to change in case of SQL injection attack
    cur.execute("INSERT INTO user_info VALUES ('" + name + "', '" + email + "', '" + password + "' )")
    print("Added user")
    conn.commit()
    cur.close()
    return "1"
    
def random_quote():
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()

    curr_date = datetime.today().strftime('%Y-%m-%d')
    #check if quote_of_day_exists
    quote_of_day = exists('quote_of_day.json')
    if quote_of_day:
        f = open('quote_of_day.json')
        data = json.load(f)

        f.close()
        #dates match
        if curr_date == data["date"]:
            return data
        else: # dates do not match
            os.remove("quote_of_day.json")
    

    #generate random quote
    cur.execute("SELECT quote, author FROM quotes ORDER BY RANDOM() LIMIT 1")
    row = cur.fetchone()
    quote = row[0]
    author = row[1]

    random_quote = {
        "author" : author,
        "quote" : quote,
        "date" : curr_date
    }

    # intentional write here?
    f = open('quote_of_day.json', 'w')
    json.dump(random_quote, f, indent = 6)
    f.close()

    return random_quote

def add_quote(email, quote, category):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()

    #find max qid
    cur.execute("SELECT MAX(qid) FROM quotes")
    new_qid = cur.fetchone()[0] + 1
    print("THE MAX IS: " + str(new_qid) + "\n")
    
    #get user name from user_info
    print("TYPE:" + email)
    cur.execute("SELECT username FROM user_info WHERE email = '" + email + "'")
    temp = cur.fetchone()
    name = str(temp[0])

    #checks if name is in authors
    print("NAME: " + name)
    cur.execute("SELECT name FROM authors WHERE name = '" + name + "'")
    if (cur.rowcount == 0):
        print("Error: Username is not an author")
        cur.close()
        return "-1"

    #insert new quote into quotes
    cur.execute("INSERT INTO quotes (qid, quote, author, category) VALUES ('" + str(new_qid) + "', '" + quote + "', '" + name + "', '" + category + "' )")
    conn.commit()
    conn.close()
    print("Quote added")
    return str(new_qid)

def author_info(aid, sortby, startIndex, num_of_quotes, categories):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()

    #gets name and description of author
    cur.execute("SELECT name, description, image FROM authors WHERE aid = '" + str(aid) + "'")
    if (cur.rowcount == 0):
        print("Error: Multiple descriptions for an author")
        cur.close()
        return "-1"
    temp = cur.fetchone()
    name = temp[0]
    description = temp[1]
    image = temp[2]

    #set to default image place holder
    if image is None:
        image = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/9948323/85cb81325da4164e4dcec8e3e3a0389df026d7c4.png"
    
    
    #assume true = ascending
    sort_quotes_by = ""
    if sortby:
        sort_quotes_by = "ASC"
    else:
        sort_quotes_by = "DESC"

    if categories is None:
        cur.execute("SELECT quote FROM quotes WHERE author = '" + name + "' ORDER BY quote " + sort_quotes_by + ";")
    else:
        cur.execute("SELECT quote FROM quotes WHERE author = '" + name + "' and '" + categories + "' in tags ORDER BY '" + sort_quotes_by + "'")
    quotes = cur.fetchall()

    requested_quotes = quotes[startIndex : (startIndex + num_of_quotes)]

    if len(quotes) != num_of_quotes:
        print("Error: Number of quotes in database do not match number requested")
        cur.close()
        return "-1"

    requested_items = {
        "description" : description,
        "quotes" : requested_quotes,
    }
    
    print(requested_items)

    cur.close()
    return requested_items

if __name__ == '__main__':
    connect()
