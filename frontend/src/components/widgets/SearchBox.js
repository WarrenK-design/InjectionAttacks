/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  This screen holds the components for the SQL injection attack 

// Imports //
import {useState} from 'react';
import axios from 'axios';

/// Bootstrap ///
import { ButtonGroup, Col,Button, Card, Form, ToggleButton, Container, Row, InputGroup,FormControl} from 'react-bootstrap';

/// Components ///
import TableDisplay from '../Layout/TableDispaly';


function SearchBox({badAPIRoute,goodAPIRoute}){
    const [apiURL, setApiURL]   = useState(badAPIRoute);    
    const [product, setProduct] = useState('');
    const [response, setResponse] = useState();

    const theads = ['Product Code','Name','Line','Scale','Vendor','Description','Quantity In Stock','Price','MSRP']

    function handleToggle(event){
        if(apiURL == badAPIRoute){
            setApiURL(goodAPIRoute);
            console.log("CHANGE TO SAFE",apiURL);
        }else{
            setApiURL(badAPIRoute);
            console.log("CHANGE TO UNSAFE",apiURL);
        }
    }

    const handleSearch = async (event) => {
        let request = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/unsafe/sqlinjection`,
            params: {product: product}
        }
        let res = await axios(request);
        setResponse(res.data);
        console.log(res.data)
        console.log(res);
    };

    return(
        <Container>
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
        


            {typeof response !==  "undefined" &&
                <TableDisplay theads={theads}data={response}/>
            }
            
        </Container>
        
    );
}

export default SearchBox;
//