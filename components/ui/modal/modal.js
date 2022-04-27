// import { CloseIcon } from '../../icons/close-icon';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
export default function ModifiedModal({ open, onClose, children, title }) {
  return (
    <>
      <Modal show={open} onHide={onClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header> */}
        <Modal.Body
          style={{
            backgroundColor: "#08091b",
            borderRadius: "0px",
            border: "1px solid white",
            padding: "30px"
          }}
        >
          {children}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>

  );
}
