import alt from '../alt';
import CompanyApi from '../../api/CompanyApi';

class CompanyActions {

  receiveCompanies(companies) {
    return companies;
  }

  receiveCompaniesError(errors) {
    return errors;
  }

  requestCompanies() {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch();
      
      // Promise is returned, when resolved call the received bean list action
      CompanyApi.get().then((companies) => {
        actionDispatcher.receiveCompanies(companies);
      }, errors => {
        actionDispatcher.receiveCompaniesError({ errors: errors });
      });
    };
  }

}

module.exports = alt.createActions(CompanyActions);
