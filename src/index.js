import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import rootReducer from "./reducers/reducer"
import { applyMiddleware, createStore} from "redux"
import { getEmployee } from './services/employee-service';
import { getEmployees } from './actions/employee-action-creators';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunk) ));

console.log(store.getState());
/*
let sampleData=[
  {"Name": "GUPMVD", "EmpCode": "E101", "Age": 34, "Department": "dfgh", "Designation": "dfghjkl","Location": "sdfd", "LocationID": "sdsd"},
  {"Name": "DRGN", "EmpCode": "E101", "Age": 34, "Department": "dfgh", "Designation": "dfghjkl","Location": "sdfd", "LocationID": "sdsd"}
]

store.dispatch(getEmployees(sampleData));

console.log(store.getState());
*/
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
