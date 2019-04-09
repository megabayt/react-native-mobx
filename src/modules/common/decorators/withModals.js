import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Modal as ModalComponent } from '../components';

type Modals = [{
  title: string,
  text: string,
  onPress: () => void,
  buttonText: string,
}];
type State = {
  openedModalKey: string,
};
type Props = {
  navigator: {
    setOnNavigatorEvent: () => void,
  },
};
const withModals = (modals: Modals) => (WrappedComponent: React.ComponentType) => {
  class Modal extends Component<Props, State> {
    props: Props;
    state: State = {
      openedModalKey: null,
    };
    static navigatorStyle = {
      navBarHidden: true,
      screenBackgroundColor: 'white',
    };
    wrappedComponent: *;

    componentDidMount() {
      this.props.navigator.setOnNavigatorEvent(this.onSceneChanged);
    }
    onSceneChanged = (e: *): void => {
      if (e.id === 'didAppear') {
        BackHandler.addEventListener('hardwareBackPress', this.onCloseModal);
      }
      if (e.id === 'willDisappear') {
        BackHandler.removeEventListener('hardwareBackPress', this.onCloseModal);
      }
      if (this.wrappedComponent && this.wrappedComponent.onSceneChanged) {
        this.wrappedComponent.onSceneChanged(e);
      }
    }

    getRef = (c: *): void => { this.wrappedComponent = c; }

    openModal = (key: string, cb = () => {}): void => this.setState({ openedModalKey: key }, cb);

    onCloseModal = (): boolean => {
      if (this.state.openedModalKey) {
        this.setState({ openedModalKey: null });
        return true;
      }
      return false;
    }

    renderModals(): React.ComponentType {
      return modals.map((modal) => {
        if (modal.key === this.state.openedModalKey) {
          return (<ModalComponent
            key={modal.key}
            modal={modal}
            onCloseModal={this.onCloseModal}
          />);
        }
        return null;
      });
    }

    render() {
      return [
        <WrappedComponent
        {...this.props}
        ref={this.getRef}
        key={'scene'}
        openModal={this.openModal}
        openedModalKey={this.state.openedModalKey}
        />,
        this.renderModals(),
      ];
    }
  }

  Modal.displayName = `withModals(${WrappedComponent.displayName || WrappedComponent.name})`;
  return Modal;
};

export default withModals;
