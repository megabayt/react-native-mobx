import React, { Component } from 'react';
import { Header } from '../components';
import { withDebounce } from './';

const withHeader = (title: string, hideBonus: boolean = false) => (WrappedComponent: React.ComponentType) => {
  type Props = {
    navigator: {},
    renderHeader?: () => React.ComponentType,
  };
  class HeaderWrapper extends Component<Props> {
    props: Props;
    static navigatorStyle = {
      navBarHidden: true,
    };

    @withDebounce()
    onPressBack() {
      const { navigator } = this.props;
      navigator.pop();
    }

    renderHeader = props => (<Header
      key={'header'}
      hideBonus={hideBonus}
      title={title}
      onPressBack={this.onPressBack}
      {...props}
    />);

    render() {
      return (<WrappedComponent
        {...this.props}
        renderHeader={this.renderHeader}
      />);
    }
  }

  HeaderWrapper.displayName = `withHeader(${WrappedComponent.displayName || WrappedComponent.name})`;
  return HeaderWrapper;
};

export default withHeader;
