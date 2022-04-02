/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  This screen holds the components for the SQL injection attack 

/// Imports ///
// useState - State needed for chnging between the safe and non-safe url for API request 
import {useState} from 'react';

// Bootsrap //
import {Container} from 'react-bootstrap';

// Components //
import SearchBox from '../components/widgets/SearchBox';

/// sqlinjection ///
// Description:
//  This component*******
function SQLinjection(){
    // State //
    const [apiURL, setApiURL] = useState('');

    return(
        <Container>
            <h1>SQL Injection</h1>
            <p>
                This page demonstrates an SQL injection attack. The search box below can be used to search for 
                products stored within the database. The query uses the string typed in the search box however it does not 
                escape characthers or check the inputted string contains SQL code. 
            </p>
            <SearchBox 
                badAPIRoute={`${process.env.REACT_APP_API_URL}/unsafe`}
                goodAPIRoute={`${process.env.REACT_APP_API_URL}/safe`}
                />            
        </Container>
    )
}

export default SQLinjection;