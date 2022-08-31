import React from 'react';
import { HuePicker    } from 'react-color';

class PickColor  extends React.Component {
  state = {
    background: '#807F7F',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <HuePicker    
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}

export default PickColor