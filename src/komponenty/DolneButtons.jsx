import Button from "react-bootstrap/Button"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

function DolneButtons({ setPage, getData }) {
  const confirmCleaning = () => {
    confirmAlert({
      title: "Czyszczenie local storage",
      message: "Dodane lokalnie miasta zostaną usunięte. W pamięci podręcznej zostaną ponownie zapisane dane początkowe dziewięciu miast.",
      buttons: [
        {
          label: "Wyczyść",
          onClick: () => {
            localStorage.removeItem("naskcrud")
            getData()
          },
        },
        {
          label: "Anuluj",
        },
      ],
    })
  }

  return (
    <div className="mx-2">
      <Button onClick={() => setPage("dodawanie")} variant="dark" className="szer240">
        Dodaj miasto
      </Button>
      <br />
      <br />
      <Button onClick={confirmCleaning} variant="dark" className="szer240">
        Wyczyść pamięć podręczną
      </Button>
    </div>
  )
}

export default DolneButtons
