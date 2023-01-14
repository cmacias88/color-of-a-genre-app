import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({loggedIn, handleLogout, user}) {
    
    if (loggedIn){
        return (
            <Navbar sticky="top">
                <Container fluid>
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
                                onClick={handleLogout}
                                id="log-out">
                        Sign Out
                    </Nav.Link>
                    <Nav.Link href="/submit-playlist">
                        Create A Visualization
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar sticky="top">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav>
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
                </Container>
            </Navbar>
        ); 
    }
};

export default NavBar;