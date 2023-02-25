import { confirmable, createConfirmation } from "react-confirm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";


const Confirmation = ({
  ok = "OK",
  cancelLabel = "Cancel",
  title = "Confirmation",
  confirmation,
  show,
  proceed
}) => {
  return (
    <div className="static-modal">
      <Modal show={show}>
        <Modal.Header><Modal.Title>{title}</Modal.Title></Modal.Header>
        <Modal.Body>{confirmation}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => proceed(false)}>{cancelLabel}</Button>
          <Button className="button-l" bsStyle="primary" onClick={() => proceed(true)}>
            {ok}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export function confirm(confirmation,label1 = "Yes",label2 = "No") {
  return createConfirmation(confirmable(Confirmation))(
    {confirmation,label1,label2});
}