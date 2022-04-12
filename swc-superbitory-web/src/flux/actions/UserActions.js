import alt from '../alt';
import UserApi from '../../api/UserApi';
import history from '../../history';

class UserActions {

  receiveSignIn(user) {
    return dispatch => {
      if (window.location.pathname === '/login') {
        history.push('/company/customers');
      }
      dispatch(user);
    };
  }

  requestSignIn(user) {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch(user);

      // Promise is returned, when resolved call the received bean list action
      UserApi.signIn(user).then(_user => {
        console.log(_user);
        actionDispatcher.receiveSignIn(_user);
      }, errors => {
        actionDispatcher.signInError({errors: [errors]});
      });
    };
  }

  signInError(errors) {
    return errors;
  }

  receiveSignUp(user) {
    return user;
  }

  requestSignUp(user) {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch();

      // Promise is returned, when resolved call the received bean list action
      UserApi.signUp(user).then(_user => {
        actionDispatcher.receiveSignUp(_user);
      }, response => {
        actionDispatcher.signUpError(response);
      });
    };
  }

  signUpError(errors) {
    return errors;
  }

  requestSignOut() {
    return dispatch => dispatch();
  }
}

module.exports = alt.createActions(UserActions);
