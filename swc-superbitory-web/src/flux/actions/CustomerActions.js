import alt from '../alt';
import CustomerApi from '../../api/CustomerApi';
import history from '../../history';

class CustomerActions {

  receiveCustomers(customers) {
    return dispatch => {
      dispatch(customers);
      return true;
    };
  }

  receiveCustomer(customer) {
    return customer;
  }

  receiveAddCustomer(customer) {
    return dispatch => {
      dispatch(customer);
      history.push('/company/customers');
    };
  }

  receiveRemoveCustomer(customer) {
    return customer;
  }

  receiveCustomersError(errors) {
    return errors;
  }

  requestCustomers() {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch();

      // Promise is returned, when resolved call the received bean list action
      CustomerApi.get().then(customers => {
        actionDispatcher.receiveCustomers(customers);
      }).catch((errors) => {
        actionDispatcher.receiveCustomersError({ errors: errors });
      });
    };
  }

  addCustomer(customer, companyId) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      CustomerApi.create(customer, companyId).then((customers) => {
        actionDispatcher.receiveAddCustomer(customers);
      }, errors => {
        actionDispatcher.customerCreateErrors({ errors: errors });
      });
    };
  }

  removeCustomer(customerId, companyId) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      CustomerApi.delete(customerId, companyId).then((customers) => {
        actionDispatcher.receiveRemoveCustomer(customers);
      }, errors => {
        actionDispatcher.receiveCustomersError({ errors: errors });
      });
    };
  }

  customerCreateErrors(errors) {
    return errors;
  }

}

module.exports = alt.createActions(CustomerActions);
