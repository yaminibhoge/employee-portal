import React, {useContext} from 'react'
import {Table} from 'react-bootstrap';
import {EmployeeContext} from './Home'
import { Link } from 'react-router-dom'
import { Trash } from 'react-bootstrap-icons';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteEmployee } from '../actions/employee-action-creators'

function EmployeeList({deleteEmployee}){
    const {data} = useContext(EmployeeContext);
    
    function handleDelete(locationId, empCode, e){
        if(window.confirm("Do you want to delete an item?")){
            console.log(locationId, empCode)
            deleteEmployee(locationId, empCode);
        }
    }

    return(
        <React.Fragment>
            <Link to="/employees/create" className="btn btn-success">Add Employee</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Location Id</th>
                        <th>Employee Code</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Location</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item,index)=>{
                            return(<tr key={index}>
                                    <td>{item.LocationId}</td>
                                    <td>{item.EmployeeCode}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Age}</td>
                                    <td>{item.Department}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.Location}</td>
                                    <td><Link to={`/employees/loc/${item.LocationId}/ecode/${item.EmployeeCode}`}>Details</Link></td>
                                    <td><Trash className="trash-style" onClick={ (e)=>handleDelete(item.LocationId, item.EmployeeCode, e)}/></td>
                                </tr>)
                        })
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
}


function mapDispatchToProps(dispatch){
    let actionMap={
          deleteEmployee
    }
    return bindActionCreators(actionMap, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeList)