import { useEffect, useState } from "react"
import initdata from "./data/init.json"
import voivs from "./data/wojewodztwa.json"
import Formularz from "./komponenty/Formularz"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nawigacja from "./komponenty/Nawigacja"
import Wyszukiwarka from "./komponenty/Wyszukiwarka"
import ListaMiast from "./komponenty/ListaMiast"
import DolneButtons from "./komponenty/DolneButtons"
import Miasto from "./komponenty/Miasto"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function App() {
  const miastoNaPoczatek = 0 // Warszawa
  const [miasta, setMiasta] = useState([])
  const [allCities, setAllCities] = useState([])
  const [akcja, setAkcja] = useState(null)
  const [page, setPage] = useState(null)
  const [edytowany, setEdytowany] = useState(null)
  const wojewodztwa = voivs.wojewodztwa
  const [wybraneMiasto, setWybraneMiasto] = useState(miastoNaPoczatek)
  const [voivodeship, setVoivodeship] = useState("")
  const [linki, setLinki] = useState([])
  const [miejsca, setMiejsca] = useState([])
  const [show, setShow] = useState(false)

  // GET DATA //////////////////////////////////////////////////////////
  const getData = () => {
    const localData = JSON.parse(localStorage.getItem("naskcrud"))
    if (localData) {
      setMiasta(localData.cities)
      setAllCities(localData.cities)
    } else {
      localStorage.setItem("naskcrud", JSON.stringify(initdata))
      setMiasta(initdata.cities)
      setAllCities(initdata.cities)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  // END GET DATA //////////////////////////////////////////////////////////

  // EFFECTS //////////////////////////////////////////////////////////
  useEffect(() => {
    if (miasta.length > 0 && miasta[wybraneMiasto]) {
      setMiejsca(miasta[wybraneMiasto].known_places)
      setLinki(miasta[wybraneMiasto].links)
    }
  }, [miasta, wybraneMiasto])

  useEffect(() => {
    if (akcja === "zapisywanie") {
      const newLocal = { cities: miasta }
      localStorage.setItem("naskcrud", JSON.stringify(newLocal))
      goHome()
    }
    //eslint-disable-next-line
  }, [akcja])
  // END EFFECTS //////////////////////////////////////////////////////////

  // FUNCTIONS //////////////////////////////////////////////////////////
  const goHome = () => {
    getData()
    page !== "edycja" && setWybraneMiasto(miastoNaPoczatek)
    cleaning()
  }
  const deleteHandle = (name) => {
    const filteredArray = miasta.filter((item) => item.name !== name)
    setMiasta(filteredArray)
    setAkcja("zapisywanie")
  }
  const editHandle = (name) => {
    const editable = miasta.find((item) => item.name === name)
    setEdytowany(editable)
    setPage("edycja")
  }
  const indexMiasta = (name) => {
    let x = miasta.findIndex((obj) => obj.name === name)
    setWybraneMiasto(x)
    cleaning()
  }
  const cleaning = () => {
    setAkcja(null)
    setEdytowany(null)
    setPage(null)
  }
  // END FUNCTIONS //////////////////////////////////////////////////////////

  // SEARCH FUNCTIONS //////////////////////////////////////////////////////////
  const [notFound, setNotFound] = useState(0)

  const searchByString = (string) => {
    const filteredArray = allCities.filter((item) => item.name.toLowerCase().includes(string.toLowerCase()))
    if (filteredArray.length > 0) {
      setMiasta(filteredArray)
      setWybraneMiasto(0)
      setNotFound(0)
    } else {
      setNotFound(1)
      setShow(true)
    }
  }
  useEffect(() => {
    if (voivodeship !== "") {
      const filteredArray = allCities.filter((item) => item.voivodeship === voivodeship)
      if (filteredArray.length > 0) {
        setMiasta(filteredArray)
        setWybraneMiasto(0)
        setNotFound(0)
      } else {
        setNotFound(2)
        setShow(true)
        setVoivodeship("")
      }
    }
    //eslint-disable-next-line
  }, [voivodeship])

  const showAll = () => {
    getData()
    setWybraneMiasto(0)
    setVoivodeship("")
    cleaning()
  }
  const handleClose = () => {
    setShow(false)
  }
  // END SEARCH FUNCTIONS //////////////////////////////////////////////////////////

  return (
    <>
      <Container className="container">
        <Row className="header">
          <Col>
            <nav className="d-flex flex-row justify-content-between align-items-center">
              <h3>
                <span onClick={goHome}>Przeglądarka miast</span>
              </h3>
              <Nawigacja />
            </nav>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between flex-column left-column">
            <div>
              <Wyszukiwarka voivodeship={voivodeship} setVoivodeship={setVoivodeship} wojewodztwa={wojewodztwa} searchByString={searchByString} showAll={showAll} />
              <ListaMiast miasta={miasta} indexMiasta={indexMiasta} />
            </div>
            <DolneButtons setPage={setPage} getData={getData} />
          </Col>
          <Col xs={9}>
            {page ? (
              <Formularz key={page} page={page} miasta={miasta} setMiasta={setMiasta} setAkcja={setAkcja} edytowany={edytowany} wojewodztwa={wojewodztwa} />
            ) : (
              <Miasto miasta={miasta} wybraneMiasto={wybraneMiasto} editHandle={editHandle} deleteHandle={deleteHandle} miejsca={miejsca} linki={linki} />
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Brak wyników</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notFound === 1 && "Nie znaleźliśmy żadnych identycznych ciągów znaków w nazwach miast."}
          {notFound === 2 && "Nie znaleźliśmy wyników w podanym województwie."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
