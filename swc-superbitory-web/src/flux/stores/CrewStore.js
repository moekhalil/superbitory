import alt from '../alt';
import _ from 'lodash';
import CrewActions from '../actions/CrewActions';

class CrewStore {

  constructor() {
    this.bindActions(CrewActions);
    this.loadingCrews = false;
    this.crews = [];
    this.crewGetErrors = null;
    this.crewCreateErrors = null;

    // export methods we can use
    this.exportPublicMethods({
      getCrews: this.getCrews,
      getCrew: this.getCrew,
    });
  }

  // **********************************************
  //
  // Get Crew Functions
  //
  //

  onRequestCrews() {
    this.loadingCrews = true;
    this.crewGetErrors = null;
  }

  onReceiveCrews(data) {
    this._init(data);
    this.loadingCrews = false;
  }

  onReceiveCrewsError(errors) {
    this.loadingCrews = false;
    this.crewGetErrors = errors;
  }

  // **********************************************
  //
  // Create Crew Functions
  //
  //

  onAddCrew() {
    this.loadingCrews = true;
    this.crewCreateErrors = null;
  }

  onReceiveAddCrew(crew) {
    this._init(this.crews.concat(crew));
    this.loadingCrews = false;
  }

  onReceiveAddCrewsError(errors) {
    this.loadingCrews = false;
    this.crewCreateErrors = errors;
  }


  // **********************************************
  //
  // Delete Crew Functions
  //
  //

  onRemoveCrew() {
    this.loadingCrews = true;
  }

  onReceiveRemoveCrew(crew) {
    this._init(_.reject(this.crews, c => {
      return crew.id === c.id;
    }));
    this.loadingCrews = false;
  }

  // **********************************************

  getCrews() {
    return this.getState().crews;
  }

  getCrew(id) {
    return  _.find(this.getState().crews, c => { return c.id === id; });
  }

  _init(rawCrews) {
    this.crews = rawCrews;
  }
}

module.exports = alt.createStore(CrewStore);
