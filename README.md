# Color Of A Genre Project
Inspired by personalized visualizations according to Spotify users’ playlists such as Spotify Wrapped, users can create chart visualizations that not only show how frequent a genre is within a Spotify playlist, but also show the most frequent color of album covers for tracks within each of the playlist’s genres. The app also has accommodations for public use without creating an account. 

# Tech Stack and Languages
Python, JavaScript, React, Flask, SQLAlchemy (PostGreSQL), HTML and CSS

# Features
#### User Accounts (Sign Up and Login)

#### Personalized User Profile 
Give access to previous 

#### About Instructional Page 

#### Browse Other Visualizations

#### Create a Playlist Genre Visualization

# Prerequisites
A Client ID and Client Secret is needed to gain access to the Internet Game Database. To create an account, follow the directions in https://api-docs.igdb.com/#about.

Once an account is created, move on to set-up.

# Setup

Create a secrets.sh file containing:

```
export CLIENT_ID="your CLIENT ID"
export CLIENT_SECRET="your CLIENT SECRET"

```

Start a virtual environment

```

virtualenv env
source env/bin/activate

```

Source your client ID and client secret. 

```

source secrets.sh

```

Install requirements

```
cd backend/
pip3 install -r requirements.txt

```

Seed database

```

python3 seed_database.py

```

### Run Application

#### Open two terminals
Start a virtual environment and install project dependencies.
```
virtualenv env
source env/bin/activate
cd backend/
pip3 install -r requirements.txt

```

Go to web app root directory.

```
cd ~/src/color-of-a-genre-app

```

Start Flask server on one terminal

```
python3 server.py

```


Start react-app on the other terminal

```
yarn start

```