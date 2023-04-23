import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"

function Nawigacja() {
  const [show, setShow] = useState(false)
  const [strona, setStrona] = useState(0)
  const handleStrona = (x) => {
    setStrona(x)
    setShow(true)
  }
  const handleClose = () => {
    setStrona(0)
    setShow(false)
  }
  return (
    <>
      <div className="d-flex flex-row">
        <div className="mx-2 menu" onClick={() => handleStrona(1)}>
          O nas
        </div>
        <div className="mx-2 menu" onClick={() => handleStrona(2)}>
          Pomoc
        </div>
        <div className="mx-2 menu" onClick={() => handleStrona(3)}>
          Kontakt
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Strona {strona}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ślepa uliczka do strony {strona}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Nawigacja
