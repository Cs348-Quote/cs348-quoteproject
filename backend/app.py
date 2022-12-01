from flask import Flask, request, jsonify
from flask_cors import CORS


from database import check_login, create_user, random_quote, add_quote, get_map_info, search_query, author_info, search_timeline, get_quote_info


app = Flask(__name__)
CORS(app)

@app.route('/')

def hello_world():
    return 'This is my first API call!'

#checks if user login matches that in DB
@app.route('/login', methods = ["POST"]) #route depends on Jon
def get_user_login(): 
    input_json = request.get_json(force=True)
    user_info = {'email':input_json['email'],
                    'password':input_json['password']}
    return check_login(user_info["email"], user_info["password"])

#adds new user, email, and password
@app.route('/signup', methods = ["POST"]) #route depends on Jon
def new_user():
    input_json = request.get_json(force=True)
    user_info = {'name':input_json['name'],
                'email':input_json['email'],
                'password':input_json['password']}
    return create_user(user_info["name"], user_info["email"], user_info["password"])
    

@app.route('/random_quote', methods = ["GET"]) #route depends on Jon
def make_quote():
    return random_quote()

@app.route('/create', methods = ["POST"])
def create_new_quote():
    input_json = request.get_json(force=True)
    quote_info = {'email':input_json['email'],
                'quote':input_json['quote'],
                'category':input_json['category']}
    return add_quote(quote_info["email"], quote_info["quote"], quote_info["category"])



@app.route('/author', methods = ["POST"])
def get_author_info():
    input_json = request.get_json(force=True)
    print(input_json)
    info = {'authorId':input_json['authorId'],
          'sortPopAsc':input_json['sortPopAsc'],
          'startingIndex':input_json['startingIndex'],
          'nbQuotes':input_json['nbQuotes'],
          'categories':input_json['categories']}
    return author_info(info["authorId"], info["sortPopAsc"], info["startingIndex"], info["nbQuotes"], info["categories"])

@app.route('/search', methods = ["POST"])
def search():
    input_json = request.get_json(force=True)
    print(input_json)
    search_info = {'query':input_json['query'],
                'queryType':input_json['queryType']}
    return search_query(search_info["query"], search_info["queryType"])


@app.route('/countries', methods = ["GET"])
def send_map_info():
    #input_json = request.get_json(force=True)
    #map_input = {'country':input_json['country']}
    map_input = request.args.get('country')
    #print(map_input)

    return get_map_info(map_input)


@app.route('/timeline', methods = ["POST"])
def timeline_info():
    input_json = request.get_json(force=True)
    timeline_data = {'startYear':input_json['startYear'],
                    'startYearBC':input_json['startYearBC'],
                    'endYear':input_json['endYear'],
                    'endYearBC':input_json['endYearBC']}
    return search_timeline(timeline_data["startYear"], timeline_data["startYearBC"], timeline_data["endYear"], timeline_data["endYearBC"])


@app.route('/quote', methods = ["GET"])
def send_quote_info():
    quote_input = request.args.get('quote')
    print("QUOTE INPUT: ")
    print(quote_input)
    return get_quote_info(quote_input)

