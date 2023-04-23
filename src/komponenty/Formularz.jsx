import { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

function Formularz({ page, edytowany, wojewodztwa, setMiasta, miasta, setAkcja }) {
  const [name, setName] = useState("")
  const [voivodeship, setVoivodeship] = useState("")
  const [picture_url, setPictureUrl] = useState("")
  const [description, setDescription] = useState("")
  const [links, setLinks] = useState("")
  const [known_places, setKnownPlaces] = useState("")

  let formValid = true
  let miejsca = []
  let linkiMiasta = []

  useEffect(() => {
    if (page === "edycja") {
      setName(edytowany.name)
      setVoivodeship(edytowany.voivodeship)
      setPictureUrl(edytowany.picture_url)
      setDescription(edytowany.description)
      setKnownPlaces(edytowany.known_places.join(","))
      setLinks(edytowany.links.join(","))
    }

    if (page === "dodawanie") {
      setName("")
      setVoivodeship("")
      setPictureUrl("")
      setDescription("")
      setKnownPlaces("")
      setLinks("")
    }
    //eslint-disable-next-line
  }, [])

  async function isBitmapImage(url) {
    const response = await fetch(url)
    const contentType = response.headers.get("content-type")
    return contentType.startsWith("image/")
  }

  const errors = {
    name: "Błąd nazwy. Od 2 do 50 znaków, polskie litery i dywiz (-).",
    name_2: "Błąd nazwy. To miasto jest już wpisane do bazy danych. Nazwy miast muszą być unikalne.",
    picture_url: "Błąd formatu obrazka. Tylko formaty jpg, jpeg, png lub gif.",
    bitmapa: "Błąd ilustracji. Podany url nie zwraca bitmapy.",
    voivodeship: "Błąd województwa. Wybierz z listy.",
    description: "Błąd opisu. Od 25 do 2000 znaków.",
    links: "Błąd linków. Sprawdź poprawność adresów url. Linki muszą być oddzielone przecinkami.",
    known_places: "Błąd znanych miejsc. Miejsca muszą być oddzielone przecinkami. Nazwy miejsc powinny mieć od 5 do 40 znaków.",
  }

  const [showErrors, setShowErrors] = useState(false)
  const [arrErrors, setArrErrors] = useState([])

  const fireError = (co) => {
    formValid = false
    let info = errors[co]
    setArrErrors((prev) => [...prev, info])
    setShowErrors(true)
  }

  //eslint-disable-next-line
  const urlSimpleRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  const validateUrlRegex = (url) => {
    return urlSimpleRegex.test(url)
  }

  const validate = (event) => {
    event.preventDefault()
    setShowErrors(false)
    setArrErrors([])

    //validate name
    const polishAlphabetRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]{2,50}$/
    !polishAlphabetRegex.test(name) && fireError("name")
    if (page === "dodawanie") miasta.some((item) => item.name === name) && fireError("name_2")

    //validate województwo
    if (voivodeship === "") fireError("voivodeship")

    //validate img
    const imageRegex = /\.(jpeg|jpg|gif|png)$/i
    !imageRegex.test(picture_url) && fireError("picture_url")

    //validate description
    if (description.length < 25 || description.length > 2000) fireError("description")

    //validate linki
    let linki = links.split(",")
    linkiMiasta = linki.map((s) => s.trim())
    if (linkiMiasta.length > 0 && links.length > 0) {
      if (!linkiMiasta.every((m) => validateUrlRegex(m))) fireError("links")
    }

    //validate miejsca
    let places = known_places.split(",")
    miejsca = places.map((s) => s.trim())
    if (miejsca.length > 0 && known_places.length > 0) {
      if (!miejsca.every((m) => m.length >= 5 && m.length <= 40)) fireError("known_places")
    }

    //validate bitmapa
    isBitmapImage(picture_url).then((isBitmap) => {
      !isBitmap && fireError("bitmapa")
      handleSubmit()
    })
  }

  const handleSubmit = () => {
    if (formValid) {
      const newCity = {
        name: name,
        picture_url: picture_url,
        voivodeship: voivodeship,
        description: description,
        links: linkiMiasta,
        known_places: miejsca,
      }
      if (page === "edycja") {
        const updatedArray = miasta.map((miasto) => {
          if (miasto.name === edytowany.name) {
            return newCity
          }
          return miasto
        })
        setMiasta(updatedArray)
      }
      if (page === "dodawanie") {
        setMiasta([newCity, ...miasta])
      }
      setAkcja("zapisywanie")
    }
  }

  function ErrorAlert() {
    return (
      <Alert variant="danger">
        <Alert.Heading>Błędy danych formularza</Alert.Heading>
        <ol>
          {arrErrors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ol>
      </Alert>
    )
  }

  return (
    <Form onSubmit={validate} className="px-3 pt-3 right-form d-flex flex-column justify-content-between" style={{ width: "600px" }}>
      {showErrors && <ErrorAlert />}
      <div>
        <h2 className="mb-3">{page === "dodawanie" ? "Dodaj nowe miasto" : "Edytuj miasto"}</h2>
        <Form.Group className="my-2">
          <Form.Label>
            <strong>Nazwa miasta *</strong>
          </Form.Label>
          <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} required placeholder="Wpisz nazwę miasta" />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>
            <strong>Województwo *</strong>
          </Form.Label>
          <Form.Select value={voivodeship} onChange={(event) => setVoivodeship(event.target.value)} className="szer240" required>
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

        <Form.Group className="my-2">
          <Form.Label>
            <strong>Zdjęcie *</strong>
          </Form.Label>
          <Form.Control type="text" value={picture_url} onChange={(event) => setPictureUrl(event.target.value)} required placeholder="Wprowadź URL do zdjęcia miasta" />
        </Form.Group>
        {/* <div>https://upload.wikimedia.org/wikipedia/commons/c/cf/MOs810_WG_2018_8_Zaleczansko_Slaski_%28Mariacka%2C_Katowice%29.jpg</div> */}

        <Form.Group className="my-2">
          <Form.Label>
            <strong>Opis miasta *</strong>
          </Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} required placeholder="Wpisz opis miasta" />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>
            <strong>Interesujące linki</strong>
          </Form.Label>
          <Form.Control as="textarea" rows={3} value={links} onChange={(event) => setLinks(event.target.value)} placeholder="Wpisz interesujące linki oddzielone przecinkami" />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>
            <strong>Znane miejsca</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={known_places}
            onChange={(event) => setKnownPlaces(event.target.value)}
            placeholder="Wpisz znane miejsca oddzielone przecinkami"
          />
        </Form.Group>
      </div>
      <Button type="submit" variant="dark" className="szer240">
        {page === "dodawanie" ? "Dodaj nowe miasto" : "Zapisz"}
      </Button>

      <div>&nbsp;</div>
    </Form>
  )
}

export default Formularz
