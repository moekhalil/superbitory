import React from 'react';
import _ from 'lodash';
import LocationList from './list';
import LocationForm from './form';

export default class LocationsPage extends React.Component {

  constructor() {
    super();

    this.state = {
      locationFormExpanded: false,
      activeLocation: {},
      isEditing: false,
    };

    this.deleteLocation = this.deleteLocation.bind(this);
    this.toggleLocationForm = this.toggleLocationForm.bind(this);

    this.onActiveLocationChange = this.onActiveLocationChange.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  onActiveLocationChange(event) {
    const location = this.state.activeLocation;
    location[event.target.name] = event.target.value;
    this.setState({ activeLocation: location });
  }

  editLocation() {
    // TODO
  }

  saveLocation() {
    const locations = this.props.locations;

    // update location
    if (this.state.isEditing) {
      const index = _.findIndex(locations, (loc) => {
        return loc.id === this.state.activeLocation.id;
      });
      locations[index] = this.state.activeLocation;
      this.props.update(locations);
      this.setState({

        activeLocation: {},
        isEditing: false,
      });

      return;
    }


    // add location

    // temporary
    const location = this.state.activeLocation;
    location.id = Math.random(0, 10000);
    this.setState({ activeLocation: location });

    locations.push(this.state.activeLocation);

    this.props.update(locations);

    this.setState({
      activeLocation: {},
      locationFormExpanded: !this.state.locationFormExpanded,
    });
  }

  deleteLocation(locationId) {
    const locations = this.props.locations;
    _.remove(locations, (location) => {
      return location.id === parseFloat(locationId);
    });
    this.props.update(locations);
  }

  toggleLocationForm() {
    this.setState({locationFormExpanded: !this.state.locationFormExpanded});
  }

  render() {
    return (
      <div>
        <button type="button"
          className={ this.state.locationFormExpanded ? 'on addButton' : 'addButton' }
          onClick={this.toggleLocationForm}></button>

        { !this.state.locationFormExpanded ?
        <LocationList
          locations={this.props.locations}
          edit={this.editLocation}
          delete={this.deleteLocation} />
        :
        <LocationForm
          location={this.state.activeLocation || {}}
          update={this.onActiveLocationChange}
          save={this.saveLocation}
          cancel={this.toggleLocationForm} />
        }
      </div>
    );
  }
}

LocationsPage.propTypes = {
  update: React.PropTypes.func.isRequired,
  locations: React.PropTypes.array,
};
