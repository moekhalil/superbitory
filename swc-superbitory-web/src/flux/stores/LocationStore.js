import alt from '../alt';
import _ from 'lodash';
import LocationActions from '../actions/LocationActions';

class LocationStore {

  constructor() {
    this.bindActions(LocationActions);
    this.loadingLocations = false;
    this.locations = [];

    this.locationGetErrors = null;
    this.locationAddErrors = null;
    this.locationUpdateErrors = null;
    this.locationRemoveErrors = null;

    // export methods we can use
    this.exportPublicMethods({
      getLocations: this.getLocations,
      isLoading: () => this.loadingLocations,
    });
  }

  // **********************************************
  //
  // Get Locations Functions
  //
  //

  onRequestLocations() {
    this.loadingLocations = true;
    this.locationGetErrors = null;
  }

  onReceiveLocations(data) {
    this._init(data);
    this.loadingLocations = false;
  }

  onReceiveLocationsError(errors) {
    this.loadingLocations = false;
    this.locationGetErrors = errors;
  }

  // **********************************************
  //
  // Create Locations Functions
  //
  //

  onAddLocation() {
    this.loadingLocations = true;
    this.locationCreateErrors = null;
  }

  onReceiveAddLocation(location) {
    this._init(this.location.concat(location));
    this.loadingLocations = false;
  }

  onReceiveAddLocationError(errors) {
    this.loadingLocations = false;
    this.locationCreateErrors = errors;
  }

  // **********************************************
  //
  // Update Locations Functions
  //
  //

  onUpdateLocation() {
    this.loadingLocations = true;
    this.locationCreateErrors = null;
  }

  onReceiveUpdateLocation(location) {
    this._init(_.reject(this.locations, loc => {
      return location.id === loc.id;
    }).concat(location));
    this.loadingLocations = false;
  }

  onReceiveUpdateocationError(errors) {
    this.loadingLocations = false;
    this.locationUpdateErrors = errors;
  }


  // **********************************************
  //
  // Delete Locations Functions
  //
  //

  onRemoveLocation() {
    this.loadingLocations = true;
  }

  onReceiveRemoveLocation(location) {
    this._init(_.reject(this.locations, loc => {
      return location.id === loc.id;
    }));
    this.loadingLocations = false;
  }

  onReceiveRemoveLocationErrors(errors) {
    this.locationRemoveErrors = errors;
    this.loadingLocations = false;
  }

  // **********************************************

  getLocations() {
    return this.getState().locations;
  }

  _init(rawLocations) {
    this.locations = rawLocations;
  }
}

module.exports = alt.createStore(LocationStore);
