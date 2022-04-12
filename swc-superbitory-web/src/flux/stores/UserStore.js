import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {


    constructor() {
      this.bindActions(UserActions);
      this.loadingUser = false;
      this.user = null;
      this.signUpErrors = null;
      this.signInErrors = null;

      // export methods we can use
      this.exportPublicMethods({
        getUser: this.getUser,
        getCompany: this.getCompany,
        isLoggedIn: this.isLoggedIn,
        getSignUpErrors: this.getSignUpErrors,
        getSignInErrors: this.getSignInErrors,
      });
    }


    // **********************************************
    //
    // Sign Up User Functions
    //
    //


    onSignUp() {
      this.loadingUser = true;
      this.signUpErrors = null;
    }

    onReceiveSignUp(user) {
      this._init(user);
      this.loadingUser = false;
    }

    onSignUpError(errors) {
      this.signUpErrors = errors;
      this.loadingUser = false;
    }

    // **********************************************
    //
    // Sign In User Functions
    //
    //

    onSignIn() {
      this.loadingUser = true;
      this.signInErrors = null;
    }

    onReceiveSignIn(user) {
      this._init(user);
      this.loadingUser = false;
    }

    onSignInError(errors) {
      this.signInErrors = errors;
      this.loadingUser = false;
    }

    // *********************************************

    onRequestSignOut() {
      delete localStorage.jwt;
      this._init(null);
    }

    // *********************************************

    getUser() {
      return this.getState().user;
    }

    getCompany() {
      if (this.getState().user) {
        return this.getState().user.company;
      }
      return null;
    }

    getSignUpErrors() {
      return this.getState().signUpErrors;
    }

    getSignInErrors() {
      return this.getState().signInErrors;
    }

    isLoggedIn() {
      return (!!this.getState().user);
    }

    _init({data}) {
      const rawUser = data.attributes;
      this.user = rawUser;

      console.log(rawUser);

      /* jshint camelcase:false */
      if (rawUser && rawUser.accessToken) {
        localStorage.jwt = rawUser.accessToken;
      }
      /* jshint camelcase:true */
    }
}

module.exports = alt.createStore(UserStore);
