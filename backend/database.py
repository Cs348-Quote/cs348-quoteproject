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

def set_default_image(name):
    if "jon" in name:
        return "https://s3.amazonaws.com/rms-rmfiles-production/client_photos/athlete_3370086_profile.jpg"
    elif "chun" in name:
        return "https://media-exp1.licdn.com/dms/image/C4D03AQGBRl-wEkVYUg/profile-displayphoto-shrink_800_800/0/1602082664795?e=2147483647&v=beta&t=qpt3SQgA7XrQ76Og1PGQIQbc656XkLxZcwE3Mdmz5RI"
    else:
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

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
    #get max aid
    cur.execute("SELECT MAX(aid) FROM authors")
    temp = cur.fetchone()
    max_aid = temp[0] + 1
    cur.execute("INSERT INTO authors VALUES ('" + str(max_aid) + "', '" + name + "', NULL" + ", NULL" + ", NULL" + ", NULL" + ", NULL" + ", NULL" + ", NULL" + ", NULL" + ")")

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
        image = set_default_image(name)
    
    
    #assume true = ascending
    sort_quotes_by = ""
    if sortby:
        sort_quotes_by = "ASC"
    else:
        sort_quotes_by = "DESC"

    if categories == "None":
        cur.execute("SELECT quote, qid FROM quotes WHERE author = '" 
                    + name + "' ORDER BY quote " + sort_quotes_by + ";")
    else:
        cur.execute("SELECT quote, qid FROM quotes WHERE author = '" 
                    + name + "' and '" 
                    + categories + "'= ANY(tags) ORDER BY quote " 
                    + sort_quotes_by + ";")
    quotes = cur.fetchall()

    # properly transform quote data
    requested_quotes = []
    for quote in quotes:
        requested_quotes.append({
            "content": quote[0],
            "id": quote[1]
        })

    requested_quotes = quotes[startIndex : (startIndex + int(num_of_quotes))]

    # if len(quotes) != num_of_quotes:
    #     print("Error: Number of quotes in database do not match number requested")
    #     cur.close()
    #     return "-1"

    requested_items = {
        "author": name,
        "description" : description,
        "quotes" : requested_quotes,
        "url": image
    }
    
    print(requested_items)

    cur.close()
    return requested_items


def get_map_info(requested_country):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()
    list_of_authors_and_coords = []
    result = []

    list_of_countries_in_DB = ["Afghanistan", "Algeria", "Ancient Rome", "Argentina", "Australia", "Austria", "Azerbaijan", "Bangladesh", "Barbados", "Belarus", "Belgium", "Bosnia and Herzegovina", "Brazil", "British Empire", "Bulgaria", "Canada", "Chile", "Classical Athens", "Colombia", "concessions in China", "Croatia", "Cuba", "Czech Republic", "Denmark", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "Ethiopia", "Finland", "France", "Free City of Danzig", "Georgia", "German Reich", "Germany", "Ghana", "Greece", "Guatemala", "Guyana", "Haiti", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kingdom of Denmark", "Kingdom of England", "Kosovo", "Kuwait", "Latin Empire", "Latvia", "Lebanon", "Liberia", "Lithuania", "Luxembourg", "Malawi", "Malta", "Mandatory Palestine", "Mauritius", "Mexico", "Mongolia", "Morocco", "Mozambique", "Mughal Empire", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nigeria", "North Korea", "North Macedonia", "Norway", "Pakistan", "People\"s Republic of China", "Peru", "Philippines", "Poland", "Portugal", "Principality of Bitlis", "Principality of Bulgaria", "Province of Massachusetts Bay", "Prussia", "Puerto Rico", "Republic of China", "Republic of Ireland", "Republic of Vietnam", "Romania", "Russia", "Rwanda", "Saint Lucia", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Song", "South Africa", "South Korea", "Soviet Union", "Spain", "Sri Lanka", "State of Palestine", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand", "The Bahamas", "Trinidad and Tobago", "Tunisia", "Turkey", "Ukraine", "Union of South Africa", "United Arab Emirates", "United Kingdom", "United Kingdom of Great Britain and Ireland", "United States of America", "Uruguay", "Venezuela", "Vietnam", "Yemen", "Zhou dynasty", "Zimbabwe", "Zimbabwe Rhodesia", "فلسطين"]

    #retrieve authors with country "requested_country"
    sql_statement = "SELECT name, coordx, coordy, aid FROM authors WHERE country IN (%s) ORDER BY RANDOM() LIMIT 10;"
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
        
        for y in result:
            x1 = y["coordinates"][0]
            y1 = y["coordinates"][1]
            dist = ( (x[1] - x1)**2 + (x[2] - y1)**2 )**0.5
            if dist < 3:
                continue
        temp_dict["coordinates"] = [x[1], x[2]]
        temp_dict["authorID"] = x[3]
        result.append(temp_dict)
    print(result)
    #print("Authors and Coordinates retrieved")
    conn.close()
    return result


def search_query(queryString, queryType):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()

    if queryType == 'Authors':
        cur.execute("SELECT DISTINCT name FROM authors")
        list_of_authors = cur.fetchall()

        sql_statement = "SELECT aid, name FROM authors where name = (%s);"
        list_of_similar_authors = []
        final_list = []
        for x in list_of_authors:
            temp = fuzz.partial_ratio(queryString, x)
            if temp > 80:
                list_of_similar_authors.append(x)

        #haven't read this
        for x in list_of_similar_authors:
            data = (x,)
            cur.execute(sql_statement, data)
            final_list += cur.fetchall()
            
        print(final_list)
        conn.close()
        return final_list

    elif queryType == 'Quotes':
        cur.execute("SELECT qid, quote FROM quotes WHERE quote LIKE '" + queryString + "%' OR quote LIKE '%" + queryString + "%';")
        list_of_similar_quotes= cur.fetchall()
        print(list_of_similar_quotes)

        cur.execute("SELECT author FROM quotes WHERE quote LIKE '" + queryString + "%' OR quote LIKE '%" + queryString + "%';")
        list_of_author_names = cur.fetchall()
        print(list_of_author_names)
        
        sql_statement = "SELECT aid, name FROM authors where name = (%s);"

        final_list = []
        list_of_author_id_and_names = []
        for x in list_of_author_names:
            data = (x,)
            cur.execute(sql_statement, data)
            list_of_author_id_and_names += cur.fetchall()

        for i in range(0, len(list_of_author_names)):
            list_of_similar_quotes[i] += list_of_author_id_and_names[i]
            final_list.append(list_of_similar_quotes[i])

        dictionary_for_jon = []
        for i in range(0, len(list_of_author_names)):
            temp = {}
            temp['quoteContent'] = final_list[i][1]
            temp['quoteId'] = final_list[i][0]
            temp['authorName'] = final_list[i][3]
            temp['authorId'] = final_list[i][2]
            dictionary_for_jon.append(temp)
        
        conn.close()
        return dictionary_for_jon


def search_timeline(startYear, startBC, endYear, endBC):
    DATE2STR = psycopg2.extensions.new_type(
    psycopg2.extensions.DATE.values,
    'DATE2STR',
    lambda value, curs:
        str(value) if value is not None else None)

    psycopg2.extensions.register_type(DATE2STR)

    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()

    for i in range(0, 4):
        if len(str(startYear)) != 4:
            startYear = "0" + startYear
        if len(str(endYear)) != 4:
            endYear = "0" + endYear

    startDate = str(startYear) + "-01-01"
    endDate = str(endYear) + "-12-31" 

    if startBC:
        #startDate = "-" + startDate
        startDate += " BC"
    if endBC:
        #endDate += "-" + endDate
        endDate += " BC"

    print("Start Date: ")
    print(startDate)
    print("End Date: ")
    print(endDate)

    sql = "SELECT aid, name, image, description, birthdate FROM authors WHERE birthdate BETWEEN (%s) AND (%s) ORDER BY RANDOM() LIMIT 20"
    data = (startDate, endDate)
    cur.execute(sql, data)
    list_of_tuples = cur.fetchall()
    
    list_of_dictionaries_for_brandon = []
    for x in list_of_tuples:
        temp = {}
        temp["aid"] = x[0]
        temp["author_name"] = x[1]
        temp["image"] = x[2]
        temp["author_description"] = x[3]
        temp["birth_date"] = x[4]

        if temp["image"] is None:
            temp["image"] = set_default_image(x[1])

        list_of_dictionaries_for_brandon.append(temp)
    
    print(list_of_dictionaries_for_brandon)

    conn.close()
    return list_of_dictionaries_for_brandon


def get_quote_info(quote):
    conn = psycopg2.connect(CONNECT_STRING)
    cur = conn.cursor()

    sql = "SELECT aid, name, quote FROM authors INNER JOIN quotes ON quotes.author = authors.name WHERE qid = (%s);"
    data = (quote, )
    cur.execute(sql, data)

    tuple_of_data = cur.fetchone()
    if len(cur.fetchall()) > 1:
        print("ERROR: Quote ID is not unique")
        return "-1"
    
    print(tuple_of_data)

    aid = tuple_of_data[0]
    author_name = tuple_of_data[1]
    quote_content = tuple_of_data[2]

    dictionary_for_brandon = {}
    dictionary_for_brandon['aid'] = aid
    dictionary_for_brandon['author_name'] = author_name
    dictionary_for_brandon['quote_content'] = quote_content

    conn.close()
    print("DICTIONARY FOR BRANDON: ")
    print(dictionary_for_brandon)
    return dictionary_for_brandon


if __name__ == '__main__':
    connect()
