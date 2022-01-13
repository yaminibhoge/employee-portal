import { Container, Col, Row } from "react-bootstrap";
import React,{Component} from 'react'
import {getEmployees} from '../services/employee-service';
import EmployeeList from './EmployeeList'
import SearchBar from './SearchBar'
import {connect} from 'react-redux'

export const EmployeeContext = React.createContext();

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            employees:props.employees,
            filteredResult:props.employees
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    //lifecycle methos which is called auto matically after constructor or prop changes
    static getDerivedStateFromProps(newProps, oldState){
        if(newProps.employees.length != oldState.employees.length){
            console.log(newProps)
            return{
                employees:newProps.employees,
                filteredResult:newProps.employees
            }
        }
        return null;
    }
    async componentDidMount(){
        /*
        let employees = await getEmployees().catch(err=>{console.log(err);})
        this.setState({employees, filteredResult:employees}) //equivalent to ({employees:employees}) as both key & value are same variables
        */
    } 

    handleSearch(searchText){
        if(searchText && searchText.length>0)
        {
            searchText = searchText.toUpperCase();
            let searchResult = this.state.employees.filter((item)=>item.Name.toUpperCase().indexOf(searchText)>=0 || item.Location.toUpperCase().indexOf(searchText)>=0)
            this.setState({filteredResult:searchResult});
        }
        else
        {
            this.setState({filteredResult:this.state.employees});
        }
    }
    render(){
        return(<EmployeeContext.Provider value={{employees : this.state.employees, data:this.state.filteredResult, doSearch:this.handleSearch}}>
            <Container>
                <Row>
                    <Col>
                        <h2>Home</h2>
                        <SearchBar/>
                        <EmployeeList/>
                    </Col>
                </Row>
            </Container>
            </EmployeeContext.Provider>
        )
    }
}

function mapStateToProps(globalState){
    return{
        employees : globalState.employeeState.employees
    }
}

export default connect(mapStateToProps)(Home);