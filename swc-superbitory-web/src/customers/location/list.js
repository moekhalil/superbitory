import React from 'react';

export default class LocationList extends React.Component {

  constructor() {
    super();
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit(e) {
    e.preventDefault();
    this.props.edit(e.target.name);
  }

  delete(e) {
    e.preventDefault();
    this.props.delete(e.target.name);
  }

  render() {
    return (
      <div className="locationsTableContainer paper">
      <table className="locationsTable">
        <thead>
          <tr>
            <th className="description">Description</th>
            <th className="street">Street Address</th>
            <th className="city">City</th>
            <th className="buttons"></th>
          </tr>
        </thead>
        <tbody>
          { this.props.locations.map((loc) => {
            return (
              <tr key={loc.id}>
                <td>{loc.description}</td>
                <td>{loc.street1 + ' ' + (loc.street2 || '')}</td>
                <td>{loc.city}</td>
                <td>
                  <button className="small" name={loc.id} onClick={this.edit}>Edit</button>
                    <button className="small" name={loc.id} onClick={this.delete}>Delete</button>
                </td>
              </tr>
            );
          })
          }
        </tbody>
      </table>
      </div>
    );
  }
}

LocationList.propTypes = {
  edit: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired,
  locations: React.PropTypes.array,
};
