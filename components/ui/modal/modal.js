// import { CloseIcon } from '../../icons/close-icon';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
export default function ModifiedModal({ open, onClose, children }) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Modal size="lg" show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>

  );
}
