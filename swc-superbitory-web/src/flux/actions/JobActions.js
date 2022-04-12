import alt from '../alt';
import JobApi from '../../api/JobApi';
import history from '../../history';


class JobActions {

  receiveJobs(jobs) {
    return dispatch => {
      dispatch(jobs);
      return true;
    };
  }

  receiveAddJob(job) {
    return dispatch => {
      dispatch(job);
      history.push('/company/jobs');
    };
  }

  receiveRemoveJob(job) {
    return job;
  }

  receiveGetErrors(errors) {
    return errors;
  }

  recieveCreateErrors(errors) {
    return errors;
  }

  recieveDeleteErrors(errors) {
    return errors;
  }

  requestJobs() {
    return dispatch => {
      // Have to reference "this" so we can call
      // our own actions inside the promise return
      const actionDispatcher = this;

      // Call this action
      dispatch();

      // Promise is returned, when resolved call the received bean list action
      JobApi.get().then(jobs => {
        actionDispatcher.receiveJobs(jobs);
      }, errors => {
        actionDispatcher.receiveGetErrors({ errors: errors });
      });
    };
  }

  addJob(_job) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      JobApi.create(_job).then(job => {
        actionDispatcher.receiveAddJob(job);
      }, errors => {
        actionDispatcher.recieveCreateErrors({ errors: errors });
      });
    };
  }

  removeJob(_job) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      JobApi.delete(_job).then(job => {
        actionDispatcher.receiveRemoveJob(job);
      }, errors => {
        actionDispatcher.recieveDeleteErrors({ errors: errors });
      });
    };
  }

}

module.exports = alt.createActions(JobActions);
