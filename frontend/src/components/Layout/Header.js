/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  This component is the header which appears at the top of every page


// Imports //
// Link - Want to use bootstraps Nav.Link component, but need it to behave like a Link react-router-dom component
//        by default it behaves like a ahref which will cause a rerender of components in react 
import {Link} from 'react-router-dom';

/// Bootsrap ///
import {Container,Col,Navbar,Nav,NavDropdown} from 'react-bootstrap';


// Header ///
// Header is displayed on every page, 
// Holds the navigation bar 
function Header() {
    return(
    <header className="pb-4">
       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand as={Link} to="/">Secure Systems - Assignment Two</Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/sqlinjection">SQL Injection</Nav.Link>
                <Nav.Link as={Link} to="/commandinjection">Command Injection</Nav.Link>
            </Nav>
        </Container>   
        </Navbar>  
    </header>
        )
}


export default Header;