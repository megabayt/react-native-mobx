import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { connectStyle, ContentNB } from './';
import variables from '../../../constants/variables';

type Props = {
  noHeader: boolean,
  isLoading?: boolean,
  reload?: () => void,
  contentContainerStyle?: {} | [] | number,
  infiniteScroll?: () => void,
  getRef?: (c: any) => void,
};
type State = {
  loading: boolean,
  height: number,
}
class Content extends Component<Props, State> {
  props: Props;
  static defaultProps: Props = {
    noHeader: false,
  };
  state: State = {
    loading: false,
    height: 0,
  };

  getRefreshControl = () => this.props.reload && (<RefreshControl
    refreshing={this.props.isLoading}
    onRefresh={this.props.reload}
  />);

  onScroll = ({ nativeEvent }) => {
    if (this.state.loading && nativeEvent.contentSize.height !== this.state.height) {
      this.setState({
        loading: false,
      });
    }
    if (!this.state.loading) {
      const paddingToBottom = 30;
      const isCloseToBottom =
        (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        >= (nativeEvent.contentSize.height - paddingToBottom)
        && nativeEvent.contentSize.height > 500;
      if (isCloseToBottom && this.props.infiniteScroll) {
        this.setState({
          loading: true,
          height: nativeEvent.contentSize.height,
        }, () => this.props.infiniteScroll());
      }
    }
  };

  render() {
    const {
      contentContainerStyle,
      noHeader,
    } = this.props;
    return (<ContentNB
        {...this.props}
        ref={this.props.getRef}
        refreshControl={this.getRefreshControl()}
        onScroll={this.onScroll}
        contentContainerStyle={[
          contentContainerStyle,
          !noHeader && {
            paddingTop:
            variables.toolbarHeight + variables.toolbarShadowHeight
            + (variables.platform === 'android' ? variables.headerPaddingTop : 0),
          },
        ]}
      />);
  }
}

// connect the component to the theme
export default connectStyle('NativeBase.Content', {})(Content);
