import pickle
import requests
import pandas as pd
import re
movies_dict = pickle.load(open('movies_dict.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)
print(movies.shape)


def get_movie_details(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=fbca03ae512501000b0e1abab98c7121"
    response = requests.get(url)
    movie_details = response.json()
    return movie_details


def get_movie_details1(movie_id):
    movie_details = get_movie_details(movie_id)
    return "http://image.tmdb.org/t/p/w500/" + movie_details['poster_path']


def recommend_movie(movie):
    # fetch index of movie
    movie_index = movies[movies['title'] == movie].index[0]
    print(movie_index)
    # fetching similarity of movie with other movies from similarity matrix
    distance = similarity[movie_index]
    movie_recommend = sorted(list(enumerate(distance)),
                             reverse=True, key=lambda x: x[1])[1:11]
    print(movie_recommend)
    dict = {}
    recommendations = []
    for i in movie_recommend:
        movie_id = movies.iloc[i[0]].movie_id
        print(movie_id)
        movie_details = get_movie_details(movie_id)
        if "backdrop_path" in movie_details and movie_details["backdrop_path"]:
            backdrop_url = "http://image.tmdb.org/t/p/w500/" + movie_details["backdrop_path"]
        else:
            backdrop_url = "https://source.unsplash.com/1600x900/?" + movies.iloc[i[0]].title
        dict = {"movie_name": movies.iloc[i[0]].title,
                "poster": get_movie_details1(movie_id),
                "overview": movie_details["overview"],
                "releasedate": movie_details["release_date"],
                "backdrop": backdrop_url,
                }
        recommendations.append(dict)
    return recommendations

def all_movies():
    return {"movies":movies["title"].tolist()}

def search_substring_in_list(strings, substring):
    pattern = re.compile(rf'\b{substring}\w*\b', re.IGNORECASE)
    return [string for string in strings if re.search(pattern, string)]

movie_names = movies["title"].tolist()

def top_matches(substring):
    return search_substring_in_list(movie_names, substring)[:15]

