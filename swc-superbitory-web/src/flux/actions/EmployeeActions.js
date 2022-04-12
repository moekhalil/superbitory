import alt from '../alt';
import EmployeeApi from '../../api/EmployeeApi';
import history from '../../history';


class EmployeeActions {

  receiveEmployees(employees) {
    return employees;
  }

  receiveEmployeeError(errors) {
    return errors;
  }

  receiveAddEmployee(employee) {
    return dispatch => {
      dispatch(employee);
      history.push('/company/workforce/employees');
    };
  }

  receiveAddEmployeeError(errors) {
    return errors;
  }

  receiveRemoveEmployee(employee) {
    return employee;
  }

  receiveRemoveEmployeeError(errors) {
    return errors;
  }


  requestEmployees() {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch();

      // Promise is returned, when resolved call the received bean list action
      EmployeeApi.get().then(employees => {
        actionDispatcher.receiveEmployees(employees);
      }, errors => {
        actionDispatcher.receiveEmployeeError({ errors: errors });
      });
    };
  }

  addEmployee(_employee) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      EmployeeApi.create(_employee).then(employee => {
        actionDispatcher.receiveAddEmployee(employee);
      }, errors => {
        actionDispatcher.receiveAddEmployeeError({ errors: errors });
      });
    };
  }

  removeEmployee(employeeId) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      EmployeeApi.delete(employeeId).then(employee => {
        actionDispatcher.receiveRemoveEmployee(employee);
      }, errors => {
        actionDispatcher.receiveRemoveEmployeeError({ errors: errors });
      });
    };
  }

  customerCreateErrors(errors) {
    return errors;
  }

}

module.exports = alt.createActions(EmployeeActions);
