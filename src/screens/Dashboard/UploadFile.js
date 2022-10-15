import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

//components
import DropZone from "../../component/DropZone";

const UploadFile = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Upload
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <DropZone setModalShow={setModalShow} />
            </Form.Group>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadFile;
