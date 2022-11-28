from flask import Flask, request, jsonify
from flask_cors import CORS
from database import check_login, create_user, random_quote, add_quote, get_map_info

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

@app.route('/map', methods = ["GET"])
def send_map_info():
    input_json = request.get_json(force=True)
    print("INPUT: " + input_json)
    country = jsonify(input_json)
    return get_map_info(country)

