/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344@MyTUDublin.ie
// Description:
//  This component is used for a helpful menu of cammands to use for given attack 


/// Bootsrap ///
import {Card,Table} from 'react-bootstrap';


function Commands({data}){
    
    return(
        <Card className="mb-3">
            <Card.Header>Commands to Try</Card.Header>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                    The below commands can be tried out in the search bar to perform the attack. 
                    The commands must be copied exactly. The spacing is important for some commands,
                    wherever {"<space>"} appears replace this with a space characther. 
                    Some of these commands will cause the application to break. 
                </Card.Text>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Command</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.commands.map((item) =>{
                        return (<tr>
                            <td>{item.command}</td> 
                            <td>{item.explanation}</td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card> 
    )
}

export default Commands;