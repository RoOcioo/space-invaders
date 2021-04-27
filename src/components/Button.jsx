import React from 'react';
import './style/Button.css';

class Button extends React.Component {

  render() {
    return (
      <button onClick={this.props.begin}> Go ! </button>
    )
  }
}



export default Button;