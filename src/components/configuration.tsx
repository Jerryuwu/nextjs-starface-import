import PropertySelector from '@/components/PropertySelector'
import { Dispatch, SetStateAction, useState } from 'react'
import { SelectedPropertiesType } from '@/pages/types/SelectedPropertiesType'
import { FileContentType } from '@/pages/types/FileContentType'

function configuration({
  setSelectedProperties,
  deleteFileContent,
}: ConfigProps) {
  const [disabled, setDisabled] = useState(true)
  const [selectedProperties] = useState<SelectedPropertiesType>({
    properties: [
      { property: 'Name', id: 13, selected: false },
      { property: 'Vorname', id: 0, selected: false },
      { property: 'Nachname', id: 1, selected: false },
      { property: 'Firma', id: 2, selected: false },
      { property: 'Straße', id: 3, selected: false },
      { property: 'PLZ', id: 4, selected: false },
      { property: 'Stadt', id: 5, selected: false },
      { property: 'Bundesland', id: 6, selected: false },
      { property: 'Rufnummer', id: 7, selected: false },
      { property: 'Privatnummer', id: 8, selected: false },
      { property: 'Mobilnummer', id: 9, selected: false },
      { property: 'Fax', id: 10, selected: false },
      { property: 'E-Mail', id: 11, selected: false },
      { property: 'Website', id: 12, selected: false },
    ],
  })

  //change selection state of clicked property
  function getSelected(isSelected: boolean, id: number) {
    const changedProperty = selectedProperties.properties.filter(
      (prop) => prop.id === id
    )
    changedProperty.forEach((property) => {
      property.selected = isSelected
    })
    //check if any properties are selected, if not then disable button
    setDisabled(isNoneSelected)
  }

  //Returns if any property is selected for import
  function isNoneSelected(): boolean {
    const propertiesSelected = selectedProperties.properties.filter(
      (prop) => prop.selected
    )
    let p: SelectedPropertiesType = {
      properties: selectedProperties.properties.filter((prop) => prop.selected),
    }
    let fileContent: FileContentType = JSON.parse(
      sessionStorage.getItem('filecontent') || '{}'
    )
    if (fileContent.header.length < p.properties.length) {
      return true
    }

    return propertiesSelected.length === 0
  }

  function confirmSelection() {
    let p: SelectedPropertiesType = {
      properties: selectedProperties.properties.filter((prop) => prop.selected),
    }
    setSelectedProperties(p)
  }
  function deleteFile() {
    deleteFileContent()
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="header-text mb-4">Importkonfiguration</p>
      <p className="info-text mb-4">
        Wählen Sie die Eigenschaften aus, welche Sie in Starface importieren
        möchten. <br />
        Die Anzahl gewählter Eigenschaften darf der Anzahl der Eigenschaften
        <br /> in der CSV-Datei nicht überschreiten.
      </p>
      <p className="mb-4 text-2xl">
        Ist in Ihrer Tabelle der Vor- und Nachname in einer Spalte, wählen Sie
        dafür lediglich "Name" aus. <br />
        Vor- und Nachname werden dann automatisch geteilt.
      </p>
      <div className="flex w-1/2 flex-wrap items-center justify-center gap-2">
        {selectedProperties.properties.map((property) => (
          <PropertySelector
            option={property.property}
            key={property.id}
            number={property.id}
            sendSelected={getSelected}
          />
        ))}
      </div>
      <p className="my-4 text-xl">
        Wenn Sie alle gewünschten Eigenschaften ausgewählt haben, bestätigen Sie
        Ihre Auswahl.
      </p>
      <button
        className="orange-button"
        disabled={disabled}
        onClick={confirmSelection}
        title={
          disabled
            ? 'Bitte wählen Sie eine Eigenschaft, um fortfahren zu können'
            : ''
        }
      >
        {disabled ? 'Ungültige Anzahl Eigenschaften' : 'Auswahl bestätigen'}
      </button>
      <button className="mt-2 text-blue-700 underline" onClick={deleteFile}>
        eine andere Datei wählen
      </button>
    </div>
  )
}

export default configuration

type ConfigProps = {
  setSelectedProperties: Dispatch<SetStateAction<SelectedPropertiesType | null>>
  deleteFileContent(): void
}
