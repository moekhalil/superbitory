import alt from '../alt';
import LocationApi from '../../api/LocationApi';

class LocationActions {

  receiveLocations(locations) {
    return locations;
  }

  receiveLocationsError(errors) {
    return errors;
  }

  receiveAddLocation(location) {
    return location;
  }

  receiveAddLocationError(errors) {
    return errors;
  }

  receiveUpdateLocation(location) {
    return location;
  }

  receiveUpdateLocationError(errors) {
    return errors;
  }

  receiveRemoveLocation(location) {
    return location;
  }

  receiveRemoveLocationError(errors) {
    return errors;
  }

  requestLocations(customer) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      LocationApi.get(customer).then(locations => {
        actionDispatcher.receiveLocations(locations);
      }, errors => {
        actionDispatcher.receiveLocationsError({ errors: errors });
      });
    };
  }

  addLocation(customer, _location) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      LocationApi.create(customer, _location).then(location => {
        actionDispatcher.receiveAddLocations(location);
      }, errors => {
        actionDispatcher.receiveAddLocationError({ errors: errors });
      });
    };
  }

  updateLocation(customer, _location) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      LocationApi.update(customer, _location).then(location => {
        actionDispatcher.receiveUpdateLocation(location);
      }, errors => {
        actionDispatcher.receiveUpdateLocationError({ errors: errors });
      });
    };
  }

  removeLocation(customer, _location) {
    return dispatch => {
      const actionDispatcher = this;

      dispatch();

      LocationApi.delete(customer, _location).then(location => {
        actionDispatcher.receiveRemoveLocation(location);
      }, errors => {
        actionDispatcher.receiveRemoveLocationError({ errors: errors });
      });
    };
  }
}

module.exports = alt.createActions(LocationActions);
