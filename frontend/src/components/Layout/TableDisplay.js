/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  Component used for the table to display the data returned from API 

/// Bootstrap ///
import {Table} from 'react-bootstrap';


/// TableDisplay ///
// Description:
//  Is used to display the results returned from the SQL injection attack in a table 
// Inputs:
//  theads - Arrray of the headers of the table
//  data   - The data which will make up the rows of the table 
function TableDisplay({theads,data}){

    return(
        <Table>
            <thead>
                <tr>
                    {theads.map(item =>{
                    return(<th>{item}</th>)
                })}
                </tr>
                
            </thead>
            <tbody>
                {data.map(item => (
                    <tr>
                        {Object.keys(item).map(function (i){
                            return (<td>{item[i]}</td>)
                        })
                        }
                    </tr>
                ))
                }
            </tbody>
        </Table>
    )


}

export default TableDisplay; 