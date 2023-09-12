from flask import Flask
from flask_cors import CORS
from recommend import recommend_movie,all_movies,top_matches

app = Flask(__name__)
CORS(app)

@app.route('/')
def server():
    return "The server is running!"

@app.route('/movies/all')
def get_all_movies():
    return all_movies()

@app.route('/top/', methods=['GET'])
def top_movies():
    return ["Searching For Movies!!"]

@app.route('/top/<substring>', methods=['GET'])
def get_top_matches(substring):
    return top_matches(substring)

@app.route('/search/', methods=['GET'])
def search_none():
    return ["No Movie Provided"]

@app.route('/search/<movie>')
def search(movie):
    return recommend_movie(movie)

if __name__ == '__main__':
    app.run()

