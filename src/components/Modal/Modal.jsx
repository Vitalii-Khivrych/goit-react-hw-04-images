import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalCard } from './Modal.styled';

const modalRef = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const onBackdropClick = this.handleBackdropClick;

    return createPortal(
      <Overlay onClick={onBackdropClick}>
        <ModalCard>{children}</ModalCard>
      </Overlay>,
      modalRef
    );
  }
}

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
