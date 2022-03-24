import PropertyTable from '@/components/PropertyTable'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CsvHeaderType, FileContentType } from '@/pages/types/FileContentType'
import {
  SelectablePropertyType,
  SelectedPropertiesType,
} from '@/pages/types/SelectedPropertiesType'

type AssignmentProps = {
  fileContent: FileContentType
  selectedProperties: SelectedPropertiesType
  setFileHeaders: Dispatch<SetStateAction<CsvHeaderType[] | null>>
  deleteSelectedProperties(): void
}

function PropertyAssignment({
  fileContent,
  selectedProperties,
  setFileHeaders,
  deleteSelectedProperties,
}: AssignmentProps) {
  const [headers, setHeaders] = useState<CsvHeaderType[]>(fileContent.header)
  console.log(fileContent.header)
  /*setHeaders((current) => {
    current.forEach((value) => {
      value.selected = false
    })
    return [...current]
  })*/
  let i = 0
  selectedProperties.properties.forEach((prop) => {
    prop.id = i
    i++
  })

  function onSelect(propertyId: number, headerId: number) {
    setHeaders((current) => {
      current.forEach((value) => {
        value.selected = value.selected === propertyId ? false : value.selected
      })
      current[headerId].selected = propertyId
      return [...current]
    })
  }

  function deleteProperties() {
    deleteSelectedProperties()
  }

  function saveAssignments() {
    setFileHeaders(headers)
  }
  return (
    <div className="flex flex-col items-center justify-center text-center text-center">
      <p className="header-text mb-4">Zuordnung der Eigenschaften</p>
      <p className="info-text mb-4">
        Nun ordnen Sie den eben gewählten Eigenschaften einer Spalte aus Ihrer
        CSV-Tabelle zu. <br />
        Die Eigenschaften Ihrer Tabelle befinden sich in den Dropdown-Listen im
        unteren Teil. Sie können eine Spalte nur einer Eigenschaft zuordnen.
        Nicht zugewiesene Spalten werden nicht formatiert.
      </p>
      <div className="mt-4 flex w-2/3 flex-wrap justify-center gap-2">
        {selectedProperties.properties.map((prop) => {
          return (
            <PropertyTable
              key={prop.id}
              id={prop.id}
              propertyName={prop.property}
              headers={headers}
              onSelect={onSelect}
            />
          )
        })}
      </div>
      <div>
        <button onClick={saveAssignments} className="orange-button mt-4">
          Fortfahren
        </button>
      </div>
      <button
        className="mt-2 text-blue-700 underline"
        onClick={deleteProperties}
      >
        Eigenschaften ändern
      </button>
    </div>
  )
}

export default PropertyAssignment
