/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  Renders the main app componentes for the client side of the program 

// Imports //
// react-router-dom - Allows rendering of components for different urls 
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';



/// Components ///
// Header - The header which appears at the top of all pages 
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { Container } from 'react-bootstrap';

/// Screens ///
// sqlinjection - This is the screen display at the route /sqlinjection 
import SQLinjection from './screens/SQLinjection';

/// App ///
// Description:
//  Main component, the main function of it is to render the router to allow navigation around the site
//  using the react-router-dom library.
function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
          <Routes>
            <Route path="/sqlinjection" element={<SQLinjection/>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
    );
}

export default App;
