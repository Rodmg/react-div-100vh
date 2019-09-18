import React from 'react';
import convertStyle from './convertStyle';
import getWindowHeight from './getWindowHeight';

export default class Div100vh extends React.Component {
  state = {
    style: {}
  };

  // On mount and window resize converts rvh values to px (if there are any).
  // Also, adds `height: 100rvh` if height is not specified at all
  updateStyle = () => {
    const convertedStyle = convertStyle(this.props.style, getWindowHeight());
    this.setState({ style: convertedStyle });
  };

  onResize = () => {
    setTimeout(() => {
      this.updateStyle();
    }, 200);

    setTimeout(() => {
      this.updateStyle();
    }, 1000);
  };

  componentDidMount() {
    this.updateStyle();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const { as: Element = 'div', ...props } = this.props;

    return <Element {...props} style={this.state.style} />;
  }
}
