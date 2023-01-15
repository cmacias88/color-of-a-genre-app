import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({loggedIn, handleLogOut, user}) {
    
    if (loggedIn){
        return (
            <Navbar class="navbar" sticky="top">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <Nav.Link href="/">
                        Home
                    </Nav.Link>
                    <Nav.Link href="/about">
                        About
                    </Nav.Link>
                    <NavDropdown title="Your Profile" id="navbar-dropdown">
                        <NavDropdown.Item href={`/my-profile`}>
                            Account Information
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={`/profile/${user.user_id}/visualizations`}>
                            Your Visualizations
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/browse-visualizations">
                        Browse
                    </Nav.Link>
                    <Nav.Link href="/log-out"
                                onClick={handleLogOut}
                                id="log-out">
                        Sign Out
                    </Nav.Link>
                    <Nav.Link href="/submit-playlist">
                        Create A Visualization
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    } else {
        return (
            <Navbar class="navbar" sticky="top">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <Nav.Link href="/">
                        Home
                    </Nav.Link>
                    <Nav.Link href="/about">
                        About
                    </Nav.Link>
                    <Nav.Link href="/sign-up">
                        Sign Up
                    </Nav.Link>
                    <Nav.Link href="/log-in">
                        Log In
                    </Nav.Link>
                    <Nav.Link href="/about">
                        About
                    </Nav.Link>
                    <Nav.Link href="/browse-visualizations">
                        Browse
                    </Nav.Link>
                    <Nav.Link href="/submit-playlist">
                        Create A Visualization
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        ); 
    }
};

export default NavBar;