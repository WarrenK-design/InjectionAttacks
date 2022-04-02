/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344@MyTUDublin.ie
// Description:
//  This component is the header which appears at the top of every page


// Bootstap 
import {Container,Row,Col} from 'react-bootstrap'



function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center pb-2">
            C16463344 Warren Kavanagh
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;