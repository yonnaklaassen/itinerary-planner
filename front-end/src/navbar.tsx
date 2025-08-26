import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { themes, useTheme } from './themes';
import { useUser } from './contexts/user-context';

function CustomNavbar() {
    const { theme, toggleTheme } = useTheme();
    const { user } = useUser();

    return (
        <Navbar
            expand="lg"
            className='navbar-custom'
            bg={theme === themes.light ? "light" : "dark"}
            variant={theme === themes.light ? "light" : "dark"}
        >
            <Container fluid>
                <Navbar.Brand href="/" style={{ color: theme.textColor }}>
                    Itinerary Planner
                </Navbar.Brand>
                <Nav className="me-auto my-2 my-lg-0">
                    <Nav.Link href="/" style={{ color: theme.textColor }}>
                        Dashboard
                    </Nav.Link>
                    {!user && (
                        <Nav.Link
                            href="/login"
                            style={{ color: theme.textColor } as React.CSSProperties}
                        >
                            Login
                        </Nav.Link>
                    )}
                    {user && (
                        <Nav.Link
                            href="/login"
                            style={{ color: theme.textColor } as React.CSSProperties}
                        >
                            Logout ({user.name})
                        </Nav.Link>
                    )}
                    <NavDropdown
                        title="Link"
                        id="navbarDropdown"
                        style={{
                            '--dropdown-bg': theme.backgroundColor,
                            '--dropdown-text': theme.textColor,
                            '--dropdown-hover-bg': theme.textColor,
                            '--dropdown-hover-text': theme.backgroundColor,
                        } as React.CSSProperties}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5" >Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                        Link
                    </Nav.Link>
                </Nav>

                <Form className="d-flex align-items-center">
                    {/* <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className='me-2'
                    /> */}

                    <Form.Check
                        type="switch"
                        id="theme-switch"
                        label={theme === themes.light ? "Light" : "Dark"}
                        onChange={toggleTheme}
                        checked={theme === themes.dark}
                        className='me-2'
                    />
                </Form>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
