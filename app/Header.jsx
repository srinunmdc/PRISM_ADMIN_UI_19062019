import React from 'react';

export default class Header extends React.Component {
  render(){
    return (
      <div className="text-center">
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

module.exports = Header;
