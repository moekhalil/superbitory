import alt from '../alt';
import _ from 'lodash';
import CompanyActions from '../actions/CompanyActions';

const CHANGE_EVENT = 'change';

class CompanyStore {

  constructor() {
    this.bindActions(CompanyActions);
    this.loadingCompany = false;
    this.companies = [];
    this.companyGetErrors = null;
    this.companyCreateErrors = null;

    // export methods we can use
    this.exportPublicMethods({
      getCompanies: this.getCompanies,
      getCompany: this.getCompany,
      getCompanyCreateErrors: this.getCompanyCreateErrors,
      isLoading: () => this.loadingCompany,
    });
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  // **********************************************
  //
  // Load Companies Functions
  //
  //

  onGet() {
    this.loadingCompanies = true;
    this.companyGetErrors = null;
  }

  onReceiveCompanies(data) {
    this._init(data.companies);
    this.loadingCompanies = false;
  }

  onReceiveCompaniesError(errors) {
    this.loadingUser = false;
    this.companyGetErrors = errors;
  }

  // **********************************************
  //
  // Sign Up User Functions
  //
  //

  onCreate() {
    this.loadingUser = true;
    this.signUpErrors = null;
  }

  onReceiveCreate(user) {
    this._init(user);
    this.loadingUser = false;
  }

  onReceiveCreateErrors(errors) {
    this.signUpErrors = errors;
    this.loadingUser = false;
  }

  // **********************************************


  getCompanies() {
    return this.getState().companies;
  }

  getCompany(id) {
    return  _.find(this.getState().companies, (c) => { return c.id === id; });
  }

  getCompanyCreateErrors() {
    return this.getState().companyCreateErrors;
  }

  _init(rawCompanies) {
    this.companies = rawCompanies;
  }
}

module.exports = alt.createStore(CompanyStore);
