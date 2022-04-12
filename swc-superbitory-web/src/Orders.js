import React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default class OrderList extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [{ firstName: 'O1D111', lastName: 'Doe', phone: '734-442-2241', email: '504.33' }],
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
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ minWidth: 100 }}>In-Progress</Typography>
          <Typography sx={{ minWidth: 100 }}>Archved</Typography>
        </Box>
        <button>Kill Moe</button>
        <table>
          <thead>
            <tr>
              <th className="firstName">Order ID</th>
              <th className="lastName">Customer</th>
              <th className="phone">Phone</th>
              <th className="email">Total</th>
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
