import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import classes from "./Header.module.css";

const Header = () => {
  const userId = useSelector((store) => store.auth.user?.id);
  const user = useSelector((store) => store.auth.user);

  return (
    <Navbar
      className={classes.nav}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand href="#home">
        Eco Friend
        <img
          src="https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Leaf-512.png"
          alt=""
          width="35px"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">Map</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/blog">Blog</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          {!userId && (
            <Nav.Link>
              <Link to="/signup">Signup</Link>
            </Nav.Link>
          )}
          {!userId && (
            <Nav.Link>
              <Link to="/signin">Signin</Link>
            </Nav.Link>
          )}
          {userId && (
            <NavDropdown title={user.name} id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/account">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/logout">Logout</Link>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
