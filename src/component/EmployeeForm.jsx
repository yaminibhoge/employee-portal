import { Component } from 'react'
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import { addEmployee } from '../actions/employee-action-creators'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            employee:{
                Name:'',
                EmployeeCode:'',
                Age:0,
                Department:'',
                Designation:'',
                LocationId:'',
                Location:''
            },
            errors:{
                name:'',
                employeeCode:'',
                age:0,
                department:'',
                designation:'',
                locationId:'',
                location:''
            },
            redirect:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const {name , value} = e.target;
        const {errors, employee} = this.state;

        switch(name){
            case "EmpCode":
                if(value.length !== 4){
                    this.setState({errors:{...errors, empCode:"Employee Code length must be 4 characters"}});
                }
                else{
                    this.setState({errors:{...errors, empCode:""}});
                }
                break;
            case "Name":
                let exist = false;
                for(var ch of value){
                    if(["!", "@", "#", "$", "%", "^", "&", "*",].indexOf(ch) >=0 ){
                        exist = true;
                    }
                }
                if(exist){
                    this.setState({errors:{...errors, name:"Employee Name should not contain special character"}});
                }
                else{
                    this.setState({errors:{...errors, name:""}});
                }
                break;
            default:
                break;
        }
        this.setState({employee:{...employee, [name]:value}});
    }

    handleSubmit(e){
        e.preventDefault();
        const {errors, employee} = this.state;
        console.log(employee);
        this.props.addEmployee(employee);
        this.setState({redirect:true});
    }

    render(){
        if(this.state.redirect)
        {
            return( <Navigate to="/"></Navigate> )
        }
        return(
            <Container>
                <Row>
                    <Col className="col-md-6 mx-auto">
                        <h2> Employee - Create</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="employeeCode">
                                <Form.Label>Employee Code</Form.Label>
                                <Form.Control type="text" name="EmployeeCode" value={this.state.employee.EmployeeCode} required onChange={this.handleChange} placeholder="Enter Employee Code" />
                                <div className="text-danger">{this.state.errors.employeeCode}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="Name" value={this.state.employee.Name} onChange={this.handleChange} placeholder="Enter Employee Name" />
                                <div className="text-danger">{this.state.errors.name}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="Age" value={this.state.employee.Age} onChange={this.handleChange} placeholder="Enter Employee Age" />
                                <div className="text-danger">{this.state.errors.age}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="department">
                                <Form.Label>Department</Form.Label>
                                <Form.Control type="text" name="Department" value={this.state.employee.Department} onChange={this.handleChange} placeholder="Enter Employee Department" />
                                <div className="text-danger">{this.state.errors.department}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="designation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" name="Designation" value={this.state.employee.Designation} onChange={this.handleChange} placeholder="Enter Employee Designation" />
                                <div className="text-danger">{this.state.errors.designation}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="locationId">
                                <Form.Label>Location Id</Form.Label>
                                <Form.Control type="text" name="LocationId" value={this.state.employee.LocationId} onChange={this.handleChange} placeholder="Enter Employee Location Id" />
                                <div className="text-danger">{this.state.errors.locationId}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" name="Location" value={this.state.employee.Location} onChange={this.handleChange} placeholder="Enter Employee Location" />
                                <div className="text-danger">{this.state.errors.location}</div>
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapDispatchToProps(dispatch){
    let actionMap={
          addEmployee : addEmployee
    }
    return bindActionCreators(actionMap, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeForm)