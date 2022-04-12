import alt from '../alt';
import CrewApi from '../../api/CrewApi';
import history from '../../history';

class CrewActions {

  receiveCrews(crews) {
    return dispatch => {
      dispatch(crews);
      return true;
    };
  }

  receiveAddCrew(crew) {
    return dispatch => {
      dispatch(crew);
      history.push('/company/workforce/crews');
    };
  }

  receiveRemoveCrew(crew) {
    return crew;
  }

  receiveCrewError(errors) {
    return errors;
  }

  requestCrews() {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch();

      // Promise is returned, when resolved call the received bean list action
      CrewApi.get().then(crews => {
        actionDispatcher.receiveCrews(crews);
      }, errors => {
        actionDispatcher.receiveCrewError({ errors: errors });
      });
    };
  }

  addCrew(_crew) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      CrewApi.create(_crew).then(crew => {
        actionDispatcher.receiveAddCrew(crew);
      }, errors => {
        actionDispatcher.receiveCrewError({ errors: errors });
      });
    };
  }

  removeCrew(crewId) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      CrewApi.delete(crewId).then(crew => {
        actionDispatcher.receiveRemoveCrew(crew);
      }, errors => {
        actionDispatcher.receiveCrewError({ errors: errors });
      });
    };
  }

}

module.exports = alt.createActions(CrewActions);
