import PropertyTable from '@/components/PropertyTable'
import { Dispatch, SetStateAction, useState } from 'react'
import { CsvColumn, FileContent } from '@/types/FileContentType'
import { ContactField, ContactTemplate } from '@/types/ContactTemplate'

type AssignmentProps = {
  fileContent: FileContent
  setPropsSet: Dispatch<SetStateAction<boolean>>
  contactTemplate: ContactTemplate
  setContactTemplate: Dispatch<SetStateAction<ContactTemplate | null>>
  setFileContent: Dispatch<SetStateAction<FileContent | null>>
  deleteContactTemplate(): void
}

function PropertyAssignment({
  fileContent,
  setPropsSet,
  contactTemplate,
  setFileContent,
  deleteContactTemplate,
}: AssignmentProps) {
  const [columns, setHeaders] = useState<CsvColumn[]>(fileContent.columns)
  const [fields, setFields] = useState<ContactField[]>(contactTemplate.fields)

  function onSelect(selectedId: number, headerId: number) {
    setFields((current) => {
      current.forEach((prop) => {
        prop.selected = prop.selected === headerId ? false : prop.selected
      })
      if (current[selectedId] !== undefined)
        current[selectedId].selected = headerId
      return [...current]
    })
  }

  function saveAssignments() {
    let newFileContent: FileContent = {
      columns: fileContent.columns,
    }
    newFileContent.columns.forEach((col) => {
      col.header.selectedProperty = contactTemplate.fields.filter(
        (prop) => prop.selected === col.id
      )[0]
    })
    setFileContent(newFileContent)
    setPropsSet(true)
  }

  return (
    <div className="flex flex-col items-center justify-center text-center text-center">
      <p className="header-text mb-4">Zuordnung der Eigenschaften</p>
      <p className="info-text mb-4">
        Sie müssen nun den Eigenschaften aus der Starface-Datei Ihre Kundendaten
        zuordnen. <br />
        Die fett gedruckten Überschriften beschreibt die Daten aus Ihrer
        Kundendatei. Auswählbar darunter sind die Eigenschaften aus Starface.{' '}
        <br />
        Nun geben Sie an, in welche Eigenschaft die Daten aus Ihrer Tabelle
        geladen werden sollen. <br />
        <strong>Beispiel:</strong> Sie haben in Ihrer Kundendatei eine Spalte
        mit dem Namen "Mailadresse" und wollen diese importieren. Sie haben
        zudem eine Datei aus Starface hochgeladen, worin sich ebenfalls das Feld
        "E-Mail" befindet. <br />
        Sie wählen nun in der Box mit der Überschrift "Mailadresse" das Feld
        "E-Mail" aus.
      </p>
      <div className="mt-4 flex w-2/3 flex-wrap justify-center gap-4">
        {columns.map((header) => {
          return (
            <PropertyTable
              key={header.id}
              fields={fields}
              header={header.header}
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
        onClick={deleteContactTemplate}
      >
        Starface-Template ändern
      </button>
    </div>
  )
}

export default PropertyAssignment
