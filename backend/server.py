"""Color of a Genre server"""

from flask import Flask, session, request, jsonify, flash, redirect
from model import db, connect_to_db
import crud
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from colorthief import ColorThief

import os, urllib.request, colorsys

auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)

app = Flask(__name__, static_folder="../build", static_url_path="/")
app.secret_key = 'beholder'

SPOTIPY_ID = os.environ["SPOTIPY_CLIENT_ID"]
SPOTIPY_SECRET = os.environ["SPOTIPY_CLIENT_SECRET"]

@app.route('/api/sign-up', methods=['POST'])
def make_user_account():
    """Creates a user."""

    fname = request.json.get('fname')
    lname = request.json.get('lname')
    username = request.json.get('username')
    password = request.json.get('password')
    
    get_user = crud.get_user_by_username(username, password)

    if get_user:
        return jsonify({'error': 'Sorry, that username is already being used. Please try again.'}), 401
    else:
        user = crud.create_user(fname=fname,
                                lname=lname,
                                username=username,
                                password=password)
        db.session.add(user)
        db.session.commit()
        print('******************')
        print(user)
        print('******************')
        session['user_id'] = user.user_id
        return jsonify({
                "user_id": user.user_id,
                "fname": user.fname,
                "lname": user.lname,
                "username": user.username,
                "password": user.password
        })
    

@app.route('/api/log-in', methods=['POST'])
def check_user_login():
    """Sees if user is currently logged in."""

    username = request.json.get('username')
    password = request.json.get('password')

    user = crud.get_user_by_username(username, password)

    if user:
        if username == user.username and password == user.password:
            session['user_id'] = user.user_id
            return jsonify({
                "user_id": user.user_id,
                "fname": user.fname,
                "lname": user.lname,
                "username": user.username,
                "password": user.password
            })
        else:
            return jsonify({'error': 'Incorrect password, please try again.'})
    else: 
        return jsonify({'error': "User does not exist. Please create an account or verify your information is correct."})


@app.route('/api/genres')
def get_all_genres_json():
    """Return a JSON response with all genres."""

    genres = crud.get_all_genres()

    return jsonify({"genres": genres})


@app.route('/api/submit-playlist', methods=['POST'])
def make_playlist():
    """Creates a playlist."""

    playlist = request.json.get('playlist')

    user_playlist = sp.playlist(playlist)
    
    if user_playlist:
        playlist_name = user_playlist['name']
        playlist_uri = user_playlist['uri'] 
        if session["user"]:
            user = session["user"]
            user_id = user.user_id
            db_playlist = crud.create_playlist(playlist_uri, playlist_name, user_id)

        db.session.add(db_playlist)
        db.session.commit()

        playlist_id = db_playlist.playlist_id

        def dominant_color_from_url(url,tmp_file='tmp.jpg'):
            '''Downloads the image file and analyzes the dominant color'''
            urllib.request.urlretrieve(url, tmp_file)
            color_thief = ColorThief(tmp_file)
            dominant_color = color_thief.get_color(quality=1)
            os.remove(tmp_file)
            return dominant_color


        def hsv_conversion(rgb_tuple):
            """Converts rgb values into hsv format."""
            rgb_copy = rgb_tuple[0:]
            r, g, b = rgb_copy
            (r, g, b) = (r / 255, g / 255, b / 255)
            (h, s, v) = colorsys.rgb_to_hsv(r, g, b)
            (h, s, v) = (int(h * 360), int(s * 100), int(v * 100))
            return (h, s, v)

        playlist_id = db_playlist.playlist_id

        results = sp.playlist_tracks(playlist_uri)
        for item in results['items']:
            track = item['track']
            track_artist_uri = track['artists'][0]['uri']
            track_artist_info = sp.artist(track_artist_uri)
            track_title = track['name']
            track_artist = track['artists'][0]['name']
            track_genre = track_artist_info['genres'][0]
            track_image = track['album']['images'][0]['url']
            rgb_color = dominant_color_from_url(track_image)
            (h, s, v) = hsv_conversion(rgb_color)
            if (0 <= h < 12) or (339 <= h <= 359) and (s > 7) and (v > 56):
                track_image_color = 'red'
            elif (12 <= h <= 41) and (s > 81) and (v > 56):
                track_image_color = 'orange'
            elif (42 <= h <= 69) and (s > 7) and (v > 8):
                track_image_color = 'yellow'
            elif (70 <= h <= 166) and (s > 7) and (v > 8):
                track_image_color = 'green'
            elif (167 <= h <= 251) and (s > 7) and (v > 8):
                track_image_color = 'blue'
            elif (252 <= h <= 305) and (s > 7) and (v > 8):
                track_image_color = 'purple'
            elif (306 <= h <= 338) and (s > 7) and (v > 8):
                track_image_color = 'pink'
            elif (s < 16) and (20 < v > 92):
                track_image_color = 'grey'
            elif (s < 5) and (v < 20) or (v == 0):
                track_image_color = 'black'
            elif (s < 3) and (v > 92):
                track_image_color = 'white'
            elif (12 < h < 35) and (20 < s < 81) and  (20 < v < 56):
                track_image_color = 'brown'

            track_list = []

            db_track = crud.create_track(track_title, track_artist, track_image, track_image_color)
            db.session.add(db_track)
            db.session.commit()

            playlist_track = crud.add_track_to_playlist(db_track.track_id, playlist_id)
            db.session.add(playlist_track)
            db.session.commit()

            genre = crud.create_genre(track_genre)
            db.session.add(genre)
            db.session.commit()

            track_genre = crud.create_track_genre(genre.genre_id, db_track.track_id)
            db.session.add(track_genre)
            db.session.commit()

            track_list.append({"track_id": db_track.track_id,
                                "track_title": db_track.track_title,
                                "track_artist": db_track.track_artist,
                                "track_image": db_track.track_image,
                                "track_image_color": db_track.track_image_color,
                                "track_genre": genre.genre_name})

        return jsonify({'playlist_id': playlist_id,
                        'playlist_name': playlist_name, 
                        'playlist_uri': playlist_uri,
                        'user_id': user_id})
    else: 
        return jsonify({'error': "Playlist submission is not valid."})


@app.route('/api/visualization-generator/<playlist_id>')
def make_visualization_data(playlist_id):
    """Generates visualization data from a playlist."""

    playlist = crud.get_playlist_by_id(playlist_id)

    if playlist:
        playlist_name = playlist.playlist_name
        playlist_uri = playlist.playlist_uri

        total_track_num = len(playlist.tracks)

        track_genre_info = {}

        for track in playlist.tracks:
            track_id = track.track_id
            track_genre_name = crud.get_track_genre_name(track_id)
            if track_genre_name in track_genre_info:
                track_genre_info[track_genre_name]['count'] += 1
            else: 
                track_genre_info[track_genre_name] = {}
                track_genre_info[track_genre_name]['count'] = 1
                track_genre_info[track_genre_name]['colors'] = {}
            track_color = track.track_image_color
            for genre, values in track_genre_info.items():
                if track_genre_name == genre: 
                    if track_color in values['colors']:
                        values['colors'][track_color] += 1 
                    else:
                        values['colors'][track_color] = 1

        playlist_genre_info = []

        for genre, values in track_genre_info.items(): 
            for color, color_total in values['colors'].items():
                genre_most_common_color = ['', 0]
                if color_total > genre_most_common_color[1]:
                    genre_most_common_color = [(color, color_total)]
                elif color_total >= genre_most_common_color[1]:
                    genre_most_common_color.append((color, color_total))
            genre_most_common_color = color
            genre_percentage = ((values['count'])/total_track_num) * 100
            playlist_genre_info.append({"genre_name": genre,
                                        "percentage": genre_percentage,
                                        "most_common_color": genre_most_common_color}
                                        )      

            visualization_data = crud.create_visualization_data(genre_percentage, genre_most_common_color, genre)
            db.session.add(visualization_data)
            db.session.commit()

            playlist_visualization_data = crud.create_playlist_visualization_data(visualization_data.visualizationdata_id, playlist_id)
            db.session.add(playlist_visualization_data)
            db.session.commit()

        return jsonify({"playlist_name": playlist_name, 
                        "playlist_uri": playlist_uri,
                        "playlist_genres": playlist_genre_info})
    else: 
        return jsonify({'error': "Playlist does not exist in database."})
    

@app.route('/api/all-users')
def get_all_users():
    """View all users in a database."""

    all_users = crud.get_all_users()

    user_list = []

    for user in all_users:
        user_list.append({'user_id': user.user_id, 
                        'username':user.username})

    return jsonify(user_list)


@app.route('/api/all-playlists')
def get_all_playlists():
    """View all playlists in a database."""

    all_playlists = crud.get_all_playlists()

    playlist_list = []

    for playlist in all_playlists:
        playlist_list.append({'playlist_id': playlist.playlist_id, 
                                'playlist_name': playlist.playlist_name,
                                'user_id': playlist.user_id, 
                                "playlist_uri": playlist.playlist_uri})

    return jsonify(playlist_list)


@app.route('/api/browse-visualizations')
def browse_visualizations():
    """Returns match from database either by searching a user or playlist."""

    user = request.json.get('user_search')
    playlist = request.json.get('playlist_search')

    if user: 
        user_match = crud.get_user_by_username_only(user)
        if user_match: 
            return jsonify({"match": user_match})
        else:
            return jsonify({'error': "No user was found with that username."})
    if playlist: 
        playlist_match = crud.get_playlist_by_name(playlist)
        if playlist_match: 
            return jsonify({"match" : playlist_match})
        else:
            return jsonify({'error': "There is no visualization with that playlist name."})


# production site
@app.route("/", defaults={"path": ""})


@app.route("/<path:path>")
def index(path):
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(_error):
    return app.send_static_file("index.html")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0", port=5001)