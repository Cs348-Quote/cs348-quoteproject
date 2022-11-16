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
    cur.execute("SELECT name FROM user_info WHERE email = '" + str(email) + "'")
    if (cur.rowcount > 0):
        print("Error: Email is not unique!")
        cur.close()
        return "0"
    
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


        




if __name__ == '__main__':
    connect()
