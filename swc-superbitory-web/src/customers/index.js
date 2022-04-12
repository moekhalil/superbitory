import React from 'react';

export default class CustomersPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

CustomersPage.propTypes = {
  children: React.PropTypes.node,
};
