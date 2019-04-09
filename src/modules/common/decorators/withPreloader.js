import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { View, Spinner, Modal } from '../components';
import { withIteractionManager } from './';

type Params = {
  store?: string,
  retry?: string,
  custom?: [string],
  successTitle?: string,
  successText?: string,
}
type Props = {
  isLoading: boolean,
  error: string,
  success: boolean,
  navigator: {
    pop: () => void,
  },
  retry?: () => void,
  reset?: () => void,
};
const withPreloader = (params: Params) => (WrappedComponent: React.ComponentType) => {
  @withIteractionManager({ placeholder: <View darkBg fullscreen key={'spinner'}><Spinner /></View> })
  @inject((stores) => {
    if (params.store) {
      const { store, retry, reset } = params;
      if (params.field) {
        const { field } = params;
        const props = {
          error: stores[store][field].error,
          isLoading: stores[store][field].isLoading,
          success: stores[store][field].success,
          retry: stores[store][retry],
          reset: stores[store][field][reset] || stores[store][reset],
        };
        return props;
      }
      return {
        error: stores[store].error,
        isLoading: stores[store].isLoading,
        success: stores[store].success,
        retry: stores[store][retry],
        reset: stores[store][reset],
      };
    }
    return {};
  })
  @observer
  class PreloaderWrapper extends Component<Props> {
    props: Props;
    static navigatorStyle = {
      navBarHidden: true,
    };

    render() {
      const { isLoading, error, success } = this.props;
      return [
        <WrappedComponent
          key={'WC'}
          isLoading={isLoading}
          error={error}
          {...this.props}
        />,
        !!error && (<Modal
          onCloseModal={this.props.reset}
          hideBack={!params.reset || !this.props.reset}
          key={'modal'}
          modal={{
            title: 'Ошибка',
            text: error,
            buttonText: 'Повторить',
            onPress: () => {
              if (this.props.retry) {
                this.props.retry();
              }
            },
          }}
        />),
        (params.successTitle && success) && (<Modal
          key={'modal'}
          hideBack
          modal={{
            title: params.successTitle,
            text: params.successText,
            buttonText: 'Ок',
            onPress: () => {
              if (params.reset && this.props.reset) {
                this.props.reset();
              }
              this.props.navigator.pop();
            },
          }}
        />),
        isLoading && (<View darkBg fullscreen key={'spinner'}><Spinner /></View>),
      ];
    }
  }

  PreloaderWrapper.displayName = `withPreloader(${(WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name)) || ''})`;
  return PreloaderWrapper;
};

export default withPreloader;
