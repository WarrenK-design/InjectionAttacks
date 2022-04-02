/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344@MyTUDublin.ie
// Description:
//  This screen is the home screen just gives brief description 


// Bootstrap ///
import {Container} from 'react-bootstrap';


function HomeScreen(){
    return(
        <Container>
        <h1>Assignment Two - Injection Attacks</h1>
            <p>
                This application is a submission for Assignment Two of the Secure Systems module. It demonstrates two injection attacks, a SQL Injection on a MySQL 
                database and a command injection attack on a Linux OS. The accompanying report goes into further detail on the background of these attacks and setting up the 
                environment to test out this application. 
            </p>
        </Container>
    )
}



export default HomeScreen;