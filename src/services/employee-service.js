
import axios from 'axios';
const API_URL = process.env.REACT_APP_EMPLOYEE_API_URL

export async function getEmployees(){
    return fetch(API_URL).then(response=>response.json());
}

export async function getEmployee(locId, ecode){
    let url = `${API_URL}/location/${locId}/empcode/${ecode}`;
    return fetch(url).then(resp=>resp.json());

}

export async function addEmployee(employee){
    let url = `${API_URL}`;
    return axios.post(url,employee).then(resp => resp);

}