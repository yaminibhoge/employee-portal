import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Table } from "react-bootstrap";
import { getEmployee } from '../actions/employee-action-creators';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

function EmployeeDetails({getEmployee, employee}) {
    const { locId, ecode } = useParams();
    
    useEffect(() => {
        async function fetchEmployee() {
            let result = getEmployee(locId, ecode);
        //    console.log("res",result);
        }
        fetchEmployee();
    }, [locId, ecode]) // if locId or ecode updated then only useEffect() will execute 

    //console.log("employee",employee);

    return ( <React.Fragment> {employee && createUI()}</React.Fragment>)

    function createUI(){
    return(
        <Container>
            <Row>
                <Col className="col-md-6 mx-auto">
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th colSpan="2"><h3>Employee Details</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{employee.Name}</td>
                            </tr>
                            <tr>
                                <th>Employee Code</th>
                                <td>{employee.EmployeeCode}</td>
                            </tr>
                            <tr>
                                <th>Location Id</th>
                                <td>{employee.LocationId}</td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td>{employee.Age}</td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td>{employee.Department}</td>
                            </tr>
                            <tr>
                                <th>Designation</th>
                                <td>{employee.Designation}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{employee.Location}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
    }
}

function mapStateToProps(state){
    return{
        employee : state.employeeState.employee
    }
}

function mapDispatchToProps(dispatch){
    let actionMap = {
        getEmployee
    }
    return bindActionCreators(actionMap, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeDetails)