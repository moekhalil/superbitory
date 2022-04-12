import React from 'react';

export default class LocationForm extends React.Component {

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  onValueChange(event) {
    this.props.update(event);
  }

  save(event) {
    event.preventDefault();
    this.props.save();
  }

  cancel(event) {
    event.preventDefault();
    this.props.cancel();
  }

  render() {
    return (
      <div className="locationForm paper">
        <legend>Add Customer Location</legend>
        <div className="row horizontal">
          <div className="group">
            <label htmlFor="description"
              style={{ minWidth: '170px' }}>Description</label>
            <input name="description" style={{ maxWidth: '170px' }}
              value={this.props.location.description} type="text"
              onChange={this.onValueChange}></input>
            <div className="example">(example: "Home", "Headquarters")</div>
          </div>
        </div>
        <div className="row horizontal">
          <div className="group">
            <label htmlFor="street1" style={{ minWidth: '170px' }}>Street Address</label>
            <input name="street1"
              value={this.props.location.street1} type="text"
              onChange={this.onValueChange}></input>
          </div>
        </div>
        <div className="row horizontal">
          <div className="group">
            <label htmlFor="street2" style={{ minWidth: '170px' }}>
              Street Address (cont.)
            </label>
            <input name="street2"
              value={this.props.location.street2} type="text"
              onChange={this.onValueChange}></input>
          </div>
        </div>
        <div className="row">
          <div className="city">
            <div className="group">
              <label htmlFor="city">City</label>
              <input name="city"
                value={this.props.location.city} type="text"
                onChange={this.onValueChange}></input>
            </div>
          </div>
          <div className="state">
            <div className="group">
              <label htmlFor="state">State</label>
              <input name="state"
                value={this.props.location.state} type="text"
                onChange={this.onValueChange}></input>
            </div>
          </div>
          <div className="zip">
            <div className="group">
              <label htmlFor="zip">Postal Code</label>
              <input name="zip"
                value={this.props.location.zip} type="text"
                onChange={this.onValueChange}></input>
            </div>
          </div>
        </div>
        <div className="row">
          <label htmlFor="notes"
            style={{ display: 'block' }}>
            Location Notes
          </label>
          <textarea name="notes"
            style={{ height: '5em', width: '100%' }}
            value={this.props.location.notes} type="text"
            onChange={this.onValueChange}></textarea>
        </div>
        <div className="footer">
          <button onClick={this.cancel}>Cancel</button>
          <button onClick={this.save}>Add</button>
        </div>
      </div>
    );
  }
}

LocationForm.propTypes = {
  update: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  location: React.PropTypes.object,
};
