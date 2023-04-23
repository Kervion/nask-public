function ListaMiast({ miasta, indexMiasta }) {
  return (
    <div className="mt-4">
      {miasta.map((miasto) => (
        <div key={miasto.name} onClick={() => indexMiasta(miasto.name)} className="m-2 py-1 px-3 miastoButton">
          {miasto.name}
        </div>
      ))}
    </div>
  )
}

export default ListaMiast
