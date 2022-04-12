import alt from '../alt';
import _ from 'lodash';
import JobActions from '../actions/JobActions';

class JobStore {

  constructor() {
    this.bindActions(JobActions);
    this.loadingJobs = false;
    this.jobs = [];
    this.jobGetErrors = null;
    this.jobCreateErrors = null;
    this.jobDeleteErrors = null;

    // export methods we can use
    this.exportPublicMethods({
      getJob: this.getJob,
      getJobs: this.getJobs,
    });
  }

  // **********************************************
  //
  // Get Jobs Functions
  //
  //

  onRequestJobs() {
    this.loadingJobs = true;
    this.jobGetErrors = null;
  }

  onReceiveJobs(data) {
    this._init(data);
    this.loadingJobs = false;
  }

  onReceiveGetError(errors) {
    this.loadingJobs = false;
    this.jobGetErrors = errors;
  }

  // **********************************************
  //
  // Create Jobs Functions
  //
  //

  onAddJob() {
    this.loadingJobs = true;
    this.jobCreateErrors = null;
  }

  onReceiveAddJob(job) {
    this._init(this.jobs.concat(job));
    this.loadingJobs = false;
  }

  onRecieveCreateErrors(errors) {
    this.loadingJobs = false;
    this.jobCreateErrors = errors;
  }


  // **********************************************
  //
  // Delete job Functions
  //
  //

  onRemovejob() {
    this.loadingJobs = true;
  }

  onReceiveRemoveJob(job) {
    this._init(_.reject(this.jobs, j => {
      return job.id === j.id;
    }));
    this.loadingJobs = false;
  }

  onRecieveDeleteErrors(errors) {
    this.loadingJobs = false;
    this.jobCreateErrors = errors;
  }

  // **********************************************

  getJobs() {
    return this.getState().jobs;
  }

  getJob(id) {
    return  _.find(this.getState().jobs, j => { return j.id === id; });
  }

  _init(rawJobs) {
    this.jobs = rawJobs;
  }
}

module.exports = alt.createStore(JobStore);
