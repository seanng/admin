import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import modalStyle from './modalStyle';
import Header from './Header';
import InputWrapper from './InputWrapper';
import Input from './Input';
import Button from './Button';
import messages from './messages';

class AddRoomModal extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      setTimeout(() => {
        this.input.focus();
      }, 0); // https://github.com/reactjs/react-modal/issues/51
    }
  }

  render() {
    return (
      <Modal
        contentLabel="addRoomModal"
        isOpen={this.props.isOpen}
        style={modalStyle}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick
      >
        <Header>
          <FormattedMessage {...messages.header} />
        </Header>
        <InputWrapper>
          <Input
            innerRef={x => (this.input = x)}
            name="addRoomInput"
            type="text"
            value={this.props.addRoomInput}
            onChange={this.props.handleInputChange}
          />
        </InputWrapper>
        <Button
          primary
          onClick={this.props.addRoom}
          disabled={this.props.addRoomInput === ''}
        >
          <FormattedMessage {...messages.addRoom} />
        </Button>
        <Button onClick={this.props.closeModal}>
          <FormattedMessage {...messages.cancel} />
        </Button>
      </Modal>
    );
  }
}

export default AddRoomModal;
