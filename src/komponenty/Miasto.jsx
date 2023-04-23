import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

function Miasto({ miasta, wybraneMiasto, editHandle, deleteHandle, miejsca, linki }) {
  const confirmDelete = (name) => {
    confirmAlert({
      title: "Usuwanie miasta",
      message: "Jesteś pewny?",
      buttons: [
        {
          label: "Potwierdzam",
          onClick: () => {
            deleteHandle(name)
          },
        },
        {
          label: "Anuluję",
        },
      ],
    })
  }

  return (
    <Row className="p-4 mb-4">
      <Col xs={9}>
        <div className="d-flex justify-content-between align-items-center">
          <h1>{miasta[wybraneMiasto]?.name}</h1>
          <div>
            <FontAwesomeIcon className="awesome" icon={faPencil} size="lg" onClick={() => editHandle(miasta[wybraneMiasto]?.name)} />
            <FontAwesomeIcon className="awesome" icon={faTrashAlt} size="lg" onClick={() => confirmDelete(miasta[wybraneMiasto]?.name)} />
          </div>
        </div>
        <img className="img-fluid my-4 rounded" src={miasta[wybraneMiasto]?.picture_url} alt={miasta[wybraneMiasto]?.name} />
        <br />
        <h5>Opis</h5>
        {miasta[wybraneMiasto]?.description}
      </Col>
      <Col xs={3} className="ps-5">
        <h5>Znane miejsca</h5>
        {miejsca.map((miejsce, index) => (
          <div key={index}>{miejsce}</div>
        ))}
        <br />
        <br />
        <h5>Linki</h5>

        {linki.map((link, index) => (
          <div key={index}>
            <a href={link} target="blank">
              {link.slice(0, 22)}
            </a>
          </div>
        ))}
      </Col>
    </Row>
  )
}

export default Miasto
