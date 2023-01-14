from model import db, User, Visualization, Playlist, PlaylistTrack, Genre, Track, TrackGenre, TrackVisualization, VisualizationData, PlaylistVisualizationData, connect_to_db


def create_user(fname, lname, username, password):
    """Create and return a new user."""

    return User(fname=fname, lname=lname, username=username, password=password)


def get_all_users():
    """Gives all users."""

    all_users = User.query.all()

    return [user for user in all_users]


def get_user_by_username(username, password):
    """Gives user via their username."""

    return User.query.filter(User.username == username and User.password == password).first()


def get_user_by_username_only(username):
    """Gives user via their username only."""

    matching_user = User.query.filter(User.username == username).first()

    return matching_user


def get_playlist_by_id(playlist_id):
    """Gives playlist by id."""

    return Playlist.query.filter(Playlist.playlist_id == playlist_id).first()


def get_playlist_by_name(playlist_name):
    """Gives playlist by name."""

    matching_playlist = Playlist.query.filter(Playlist.playlist_name == playlist_name).first()

    return matching_playlist


def create_playlist(playlist_uri, playlist_name, user_id=None):
    """Create a playlist."""

    playlist_given = Playlist.query.filter(Playlist.playlist_uri == playlist_uri).first()

    if playlist_given == None:
        return Playlist(playlist_uri=playlist_uri, 
                        playlist_name=playlist_name,
                        user_id=user_id)
    return playlist_given


def get_all_playlists():
    """Gives all playlists."""

    all_playlists = Playlist.query.all()

    return [playlist for playlist in all_playlists]


def create_track(track_title, track_artist, track_image, track_image_color):
    """Create a track."""

    track = Track.query.filter(Track.track_title == track_title, Track.track_artist == track_artist).first()

    if track: 
        return track
    else:
        return Track(track_title=track_title, 
                track_artist=track_artist, 
                track_image=track_image,
                track_image_color=track_image_color
                )


def add_track_to_playlist(track_id, playlist_id):
    """Add track to a playlist."""

    playlist_track = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == playlist_id, PlaylistTrack.track_id == track_id).first()

    if not playlist_track:
        return PlaylistTrack(playlist_id=playlist_id,
                            track_id=track_id)
    return playlist_track


def get_all_tracks(playlist_id):
    """Gives all tracks from a playlist."""

    playlist = Playlist.query.filter(Playlist.playlist_id == playlist_id)

    return playlist.tracks


def create_genre(genre_name):
    """Create a genre."""

    genre = Genre.query.filter(Genre.genre_name == genre_name).first()

    if not genre: 
        return Genre(genre_name = genre_name)
    return genre

    # genre_list = Genre.query.filter(Genre.genre_name).all()

    # for genre in genre_list: 
    #     if genre_name in genre.genre_name: 
    #         return genre

    # return Genre(genre_name=genre_name)


def get_genre_id(genre_name):
    """Get genre id from a genre name."""

    genre = Genre.query.filter(Genre.genre_name == genre_name).first()

    return genre.genre_id


def get_all_genres():
    """Gives all genres."""

    genre_pool = Genre.query.all()

    return [genre for genre in genre_pool]


def create_track_genre(genre_id, track_id):
    """Add track to a genre."""

    track_genre = TrackGenre.query.filter(TrackGenre.genre_id == genre_id, TrackGenre.track_id == track_id).first()

    if not track_genre:
        return TrackGenre(genre_id=genre_id,
                        track_id=track_id)
    return track_genre


def get_track_genre_name(track_id):
    """Get genre name from a specific track."""

    track_match = TrackGenre.query.filter(TrackGenre.track_id == track_id).first()

    genre_match = track_match.genre_id

    genre = Genre.query.filter(Genre.genre_id == genre_match).first()

    return genre.genre_name


def create_visualization_data(genre_percentage, genre_most_common_color, genre_name):
    """Create visualization data from a playlist."""

    return VisualizationData(genre_percentage=genre_percentage,
                            genre_most_common_color=genre_most_common_color, 
                            genre_name = genre_name)


def create_playlist_visualization_data(visualizationdata_id, playlist_id):
    """Attributes visualization data to playlist."""

    playlistvisualization_data = PlaylistVisualizationData.query.filter(PlaylistVisualizationData.playlist_id == playlist_id, 
                                                                        PlaylistVisualizationData.visualizationdata_id == visualizationdata_id).first()


    if not playlistvisualization_data: 
        return PlaylistVisualizationData(visualizationdata_id = visualizationdata_id, 
                                        playlist_id = playlist_id)
    return playlistvisualization_data


def get_visualization_data_for_visualization(playlist_id):
    """Gives visualization data for a certain visualization."""

    all_data = PlaylistVisualizationData.query.filter(PlaylistVisualizationData.playlist_id == playlist_id).all()

    return all_data


def get_all_visualizations():
    """Gives visualization data for a certain visualization."""

    all_visualizations = VisualizationData.query.all()

    for visualization in all_visualizations:
        visualizationdata_id= visualization.visualizationdata_id
        playlist = PlaylistVisualizationData.query.filter(PlaylistVisualizationData.visualizationdata_id == visualizationdata_id).first()

    return [visualization.to_json() for visualization in all_visualizations]


# def create_visualization(user_id, playlist_id, visualization_data):
#     """Create and return a new visualization."""

#     return Visualization(
#         user_id=user_id,
#         playlist_id=playlist_id,
#         visualization_data_=visualization_data
#     )


def get_all_user_visualizations(user_id):
    """Gives all visualizations under a certain user."""

    user_playlists = Playlist.query.filter(Playlist.user_id == user_id).all()

    return [user_playlist for user_playlist in user_playlists]


def get_all_visualizations():
    """Gives all visualizations."""

    visualization_pool = VisualizationData.query.all()

    return [visualization for visualization in visualization_pool]


# def get_visualization_by_playlist(playlist_id):
#     """Gives visualization for a certain playlist."""

#     return Visualization.query.filter(Visualization.playlist_id == playlist_id).first()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)