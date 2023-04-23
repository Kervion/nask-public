import Form from "react-bootstrap/Form"
import { useState } from "react"
import Button from "react-bootstrap/Button"

function Wyszukiwarka({ voivodeship, setVoivodeship, wojewodztwa, searchByString, showAll }) {
  const [name, setName] = useState("")

  const searchCity = (e) => {
    e.preventDefault()
    if (e.key === "Enter") {
      searchByString(name)
      setName("")
      e.target.blur()
    }
  }

  const searchByVoiv = (e, v) => {
    setVoivodeship(v)
    e.target.blur()

    // e.preventDefault()
    // if (e.key === "Enter") {
    //   searchByString(name)
    //   setName("")
    //   e.target.blur()
    // }
  }

  return (
    <div className="mx-2 py-3 botttomLine">
      <Form.Group className="my-2">
        <Form.Label>
          <strong>Wyszukaj</strong>
        </Form.Label>
        <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Wpisz ciąg znaków" className="szer240" onKeyUp={searchCity} />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>
          <strong>Wybierz województwo</strong>
        </Form.Label>
        <Form.Select value={voivodeship} onChange={(event) => searchByVoiv(event, event.target.value)} className="szer240">
          <option key={"opcja_wybierz"} value="">
            Wybierz województwo
          </option>
          {wojewodztwa.map((wojew) => (
            <option key={wojew} value={wojew}>
              {wojew}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button onClick={showAll} variant="light" className="w-100 my-2 bordergrey">
        Pokaż wszystkie
      </Button>
    </div>
  )
}

export default Wyszukiwarka
