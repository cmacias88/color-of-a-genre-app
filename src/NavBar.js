import { Link } from 'react-router-dom';

function NavBar({loggedIn, handleLogOut, user}) {
    
    if (loggedIn){
        return (
            <nav class="navbar">
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/about">
                        About
                    </Link>
                    <Link to='my-profile'>
                        Your Profile
                    </Link>
                    <Link to={`/profile/${user.user_id}`}>
                        Your Visualizations
                    </Link>
                    <Link to="/browse-visualizations">
                        Browse
                    </Link>
                    <Link to="/log-out"
                        onClick={handleLogOut}
                        id="log-out"
                    >
                        Sign Out
                    </Link>
                    <Link to="/submit-playlist">
                        Create A Visualization
                    </Link>
            </nav>
        );
    } else {
        return (
            <nav class="navbar">
                <Link to="/">
                    Home
                </Link>
                <Link to="/about">
                    About
                </Link>
                <Link to="/sign-up">
                    Sign Up
                </Link>
                <Link to="/log-in">
                    Log In
                </Link>
                <Link to="/browse-visualizations">
                    Browse
                </Link>
                <Link to="/submit-playlist">
                    Create A Visualization
                </Link>
            </nav>
        ); 
    }
};

export default NavBar;