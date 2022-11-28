import psycopg2
import os
import json
from fuzzywuzzy import fuzz
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


def get_map_info(requested_country):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()
    list_of_authors_and_coords = []
    result = []

    list_of_countries_in_DB = ["Afghanistan", "Algeria", "Ancient Rome", "Argentina", "Australia", "Austria", "Azerbaijan", "Bangladesh", "Barbados", "Belarus", "Belgium", "Bosnia and Herzegovina", "Brazil", "British Empire", "Bulgaria", "Canada", "Chile", "Classical Athens", "Colombia", "concessions in China", "Croatia", "Cuba", "Czech Republic", "Denmark", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "Ethiopia", "Finland", "France", "Free City of Danzig", "Georgia", "German Reich", "Germany", "Ghana", "Greece", "Guatemala", "Guyana", "Haiti", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kingdom of Denmark", "Kingdom of England", "Kosovo", "Kuwait", "Latin Empire", "Latvia", "Lebanon", "Liberia", "Lithuania", "Luxembourg", "Malawi", "Malta", "Mandatory Palestine", "Mauritius", "Mexico", "Mongolia", "Morocco", "Mozambique", "Mughal Empire", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nigeria", "North Korea", "North Macedonia", "Norway", "Pakistan", "People\"s Republic of China", "Peru", "Philippines", "Poland", "Portugal", "Principality of Bitlis", "Principality of Bulgaria", "Province of Massachusetts Bay", "Prussia", "Puerto Rico", "Republic of China", "Republic of Ireland", "Republic of Vietnam", "Romania", "Russia", "Rwanda", "Saint Lucia", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Song", "South Africa", "South Korea", "Soviet Union", "Spain", "Sri Lanka", "State of Palestine", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand", "The Bahamas", "Trinidad and Tobago", "Tunisia", "Turkey", "Ukraine", "Union of South Africa", "United Arab Emirates", "United Kingdom", "United Kingdom of Great Britain and Ireland", "United States of America", "Uruguay", "Venezuela", "Vietnam", "Yemen", "Zhou dynasty", "Zimbabwe", "Zimbabwe Rhodesia", "فلسطين"]

    #retrieve authors with country "requested_country"
    sql_statement = "SELECT name, coordx, coordy, aid FROM authors WHERE country IN (%s);"
    # print("REQUESTED COUNTRY: ")
    # print(requested_country)
    best = -1
    list_of_best_countries = []
    for x in list_of_countries_in_DB:
        temp = fuzz.partial_ratio(requested_country, x)
        if temp == 100:
            list_of_best_countries.append(x)
        if temp > best:
            list_of_best_countries = [x]
            best = temp

    print(list_of_best_countries)
    for x in list_of_best_countries:
        data = (x,)
        # print("DATA: ")
        # print(data)
        cur.execute(sql_statement, data)
        list_of_authors_and_coords += cur.fetchall()

    print(list_of_authors_and_coords)

    print("BEST: " + str(best))
    if best <= 78:
        print("Error: No quotes from that country")
        conn.close()
        return result
    
    print("here")
    for x in list_of_authors_and_coords:
        temp_dict = {}
        temp_dict["authorName"] = x[0]

        #case Eileen Chang
        if x[1] == None or x[2] == None:
            continue

        temp_dict["coordinates"] = [x[1], x[2]]
        temp_dict["authorID"] = x[3]
        result.append(temp_dict)
    
    print(result)
    #print("Authors and Coordinates retrieved")
    conn.close()
    return result

if __name__ == '__main__':
    connect()
