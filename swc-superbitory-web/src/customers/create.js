import React from 'react';
import LocationsPage from './location/index';
import { Link }  from 'react-router';
import CustomerActions from '../../../flux/actions/CustomerActions';
import CustomerStore from '../../../flux/stores/CustomerStore';


export default class CustomerCreateForm extends React.Component {

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.updateLocations = this.updateLocations.bind(this);
    this.state = { customer: {}, locations: [], profile: true};
    this.gotoProfile = this.gotoProfile.bind(this);
    this.gotoLocations = this.gotoLocations.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    CustomerStore.listen(this.onStoreChange);
  }

  componentWillUnmount() {
    CustomerStore.unlisten(this.onStoreChange);
  }

  onValueChange(event) {
    const c = this.state.customer;
    c[event.target.name] = event.target.value;
    this.setState({ customer: c });
  }

  onStoreChange() {
    // TODO handle errors
  }

  updateLocations(locations) {
    this.setState({locations: locations});
  }

  gotoProfile(e) {
    e.preventDefault();
    this.setState({ profile: true});
  }

  gotoLocations(e) {
    e.preventDefault();
    this.setState({ profile: false});
  }

  saveCustomer(e) {
    e.preventDefault();
    const customer = this.state.customer;
    customer.locationsAttributes = this.state.locations;
    CustomerActions.addCustomer(customer);
  }

  render() {
    return (
      <form className="customerCreateForm">
        <h2>Add New Customer</h2><br />

        <nav className="pager">
          <ul>
            <li>
              <button onClick={this.gotoProfile}
                className={ this.state.profile ? 'active' : false } >Account Profile
              </button>
            </li>
            <li>
              <button onClick={this.gotoLocations}
                className={ !this.state.profile ? 'active' : false }>Locations
              </button>
            </li>
          </ul>
        </nav>
        { this.state.profile === true ?
          <div className="customerDetails paper">
            <legend>Customer Details</legend>
            <div className="row horizontal">
              <div className="group">
                <label htmlFor="firstName">First Name</label>
                <input name="firstName"
                  value={this.state.customer.firstName} type="text"
                  onChange={this.onValueChange}></input>
              </div>
            </div>
            <div className="row horizontal">
              <div className="group">
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName"
                  value={this.state.customer.lastName} type="text"
                  onChange={this.onValueChange}></input>
              </div>
            </div>
            <div className="row horizontal">
              <div className="group">
                <label htmlFor="email">Email</label>
                <input name="email"
                  value={this.state.customer.email} type="text"
                  onChange={this.onValueChange}></input>
              </div>
            </div>
            <div className="row horizontal">
              <div className="group">
                <label htmlFor="phone">Phone Number</label>
                <input name="phone"
                  value={this.state.customer.phone} type="text"
                  onChange={this.onValueChange}></input>
              </div>
            </div>
            <div className="footer">
              <Link to={'/company/customers'}>
                <button type="button" style={{'marginRight': '10px'}}>Cancel</button>
              </Link>
              <button onClick={this.gotoLocations}>Next</button>
            </div>
          </div>
        :
        <div>
          <LocationsPage locations={this.state.locations}
            update={this.updateLocations} />
          <div className="footer">
              <button onClick={this.gotoProfile}>Prev</button>
              <button onClick={this.saveCustomer}>Save</button>
            </div>
        </div>
        }
      </form>
    );
  }
}
