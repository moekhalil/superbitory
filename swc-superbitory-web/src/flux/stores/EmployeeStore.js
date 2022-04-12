import alt from '../alt';
import _ from 'lodash';
import EmployeeActions from '../actions/EmployeeActions';

class EmployeeStore {

  constructor() {
    this.bindActions(EmployeeActions);
    this.loadingEmployees = false;
    this.employees = [];

    this.employeeGetErrors = null;
    this.employeeCreateErrors = null;
    this.employeeDeleteErrors = null;

    // export methods we can use
    this.exportPublicMethods({
      getEmployees: this.getEmployees,
      getEmployee: this.getEmployee,
    });
  }

  // **********************************************
  //
  // Get Employee Functions
  //
  //

  onRequestEmployees() {
    this.loadingEmployees = true;
    this.employeeGetErrors = null;
  }

  onReceiveEmployees(data) {
    this._init(data);
    this.loadingEmployees = false;
  }

  onReceiveEmployeesError(errors) {
    this.loadingEmployees = false;
    this.employeeGetErrors = errors;
  }

  // **********************************************
  //
  // Create Employee Functions
  //
  //

  onAddCrew() {
    this.loadingEmployees = true;
    this.employeeCreateErrors = null;
  }

  onReceiveAddEmployee(employee) {
    this._init(this.employees.concat(employee));
    this.loadingEmployees = false;
  }

  onReceiveAddEmployeeError(errors) {
    this.loadingEmployees = false;
    this.employeeCreateErrors = errors;
  }


  // **********************************************
  //
  // Delete Employee Functions
  //
  //

  onRemoveEmployee() {
    this.loadingEmployees = true;
  }

  onReceiveRemoveEmployee(employee) {
    this._init(_.reject(this.employees, e => {
      return employee.id === e.id;
    }));
    this.loadingEmployees = false;
  }

  onReceiveRemoveEmployeeErrors(errors) {
    this.receiveRemoveEmployeeError = errors;
    this.loadingEmployees = false;
  }

  // **********************************************

  getEmployees() {
    return this.getState().employees;
  }

  getEmployee(id) {
    return  _.find(this.getState().employees, e => { return e.id === id; });
  }

  _init(rawEmployees) {
    this.employees = rawEmployees;
  }
}

module.exports = alt.createStore(EmployeeStore);
