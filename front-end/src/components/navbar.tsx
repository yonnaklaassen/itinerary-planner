import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { themes, useTheme } from '../themes/theme-context';
import { useUser } from '../hooks/user-context';
import { Typography } from '@mui/material';
import { PageContainer } from './page-container';

function CustomNavbar() {
    const { theme, toggleTheme } = useTheme();
    const { user, setUser } = useUser();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3080/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                console.error("Logout failed");
                return;
            }
            setUser(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <Navbar
            expand="lg"
            bg={theme === themes.light ? "light" : "dark"}
            variant={theme === themes.light ? "light" : "dark"}
            collapseOnSelect
        >
                <Navbar.Brand href="/" style={{ color: theme.textColor }}>
                    <Typography variant='h4' component="h4">  Itinerary Planner </Typography>
                </Navbar.Brand>
                { /** Home button. */}
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link href="/" style={{ color: theme.textColor }}>
                            Home
                        </Nav.Link>
                        { /** My trips button. */}
                        {user && (
                            <Nav.Link
                                className='nav-link'
                                href="/trips"
                                style={{ color: theme.textColor } as React.CSSProperties}
                            >
                                My trips
                            </Nav.Link>
                        )}
                        { /** Notifications button. */}
                        {user && (
                            <Nav.Link
                                className='nav-link'
                                href="/notifications"
                                style={{ color: theme.textColor } as React.CSSProperties}
                            >
                                Notifications
                            </Nav.Link>
                        )}
                        {/* Login/Logout buttons. */}
                        {user ? (
                            <Nav.Link
                                className='nav-link'
                                href="#"
                                onClick={handleLogout}
                                style={{ color: theme.textColor }}
                            >
                                Logout ({user.name})
                            </Nav.Link>
                        ) : (
                            <Nav.Link
                                className='nav-link' href="/login" style={{ color: theme.textColor }}>
                                Login
                            </Nav.Link>
                        )}
                        {/* <NavDropdown
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
                    </Nav.Link> */}
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
                </Navbar.Collapse >
        </Navbar>

    );
}

export default CustomNavbar;
