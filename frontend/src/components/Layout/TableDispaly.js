/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  Component used for the table to display the data returned from API 

/// Bootstrap ///
import {Table} from 'react-bootstrap';



function TableDisplay({theads,data}){


    function getTableData(){
        let element = []
        data.map((object,index) => {
            element.push('<tr>')
            for(let key in object){
                let val = object[key]
                let string = `<td>${object[key]}</td>`
                element.push(string)
            }
            element.push('</tr>')
        })
        let result = element.join(' ')
        console.log(result)
        return element
        //data.forEach(d =>{
        //    console.log(`HERE d ${d}`)
        //    Object.values(data).forEach(text =>{
        //        console.log(`HERE TEXT ${text}`)
        //    })
        //})
    }


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