import React from 'react';

export default class CustomerList extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [
        { firstName: 'John', lastName: 'Doe', phone: '734-442-2241', email: 'moe@moe.com' },
      ],
    };
    this._onStoreChange = this._onStoreChange.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  _onStoreChange() {}

  deleteCustomer(e) {
    e.preventDefault();
  }

  render() {
    console.log(';');
    return (
      <div className="listTable">
        <table>
          <thead>
            <tr>
              <th className="firstName">First Name</th>
              <th className="lastName">Last Name</th>
              <th className="phone">Phone</th>
              <th className="email">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.length
              ? this.state.customers.map((customer) => {
                  return (
                    <tr key={customer.id}>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>
                        <a href="#" name={customer.id} onClick={this.deleteCustomer}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })
              : false}
          </tbody>
        </table>
      </div>
    );
  }
}
