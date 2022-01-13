import * as ActionTypes from '../actions/actions-types'

const initialState={
    employees : [],
    employee : undefined
}

export default function employeeReducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case ActionTypes.GET_EMPLOYEES :
            return state = { ...state, employees : payload };
        
        case ActionTypes.GET_EMPLOYEE :
            return state = { ...state, employee : payload };    
        
        case ActionTypes.ADD_EMPLOYEE :
            return { ...state, employees : [...state.employees, payload] };
            
        case ActionTypes.DELETE_EMPLOYEE :
            let dItem = state.employees.find(item=>item.LocationId===payload.locationId && item.EmployeeCode===payload.empCode)
            console.log(dItem);
            return { ...state, employees : state.employees.filter(item=>item!=dItem) };

        default :
            return state;
            

    }
}