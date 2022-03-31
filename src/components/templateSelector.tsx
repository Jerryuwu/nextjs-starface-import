import { ContactTemplate, ContactField } from '@/pages/types/ContactTemplate'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

type ContactTemplateProps = {
  setContactTemplate: Dispatch<SetStateAction<ContactTemplate | null>>
  deleteFileContent(): void
}

function TemplateSelector({
  setContactTemplate,
  deleteFileContent,
}: ContactTemplateProps) {
  let fileReader: FileReader

  function handleChosenFile(file: File) {
    if (file === undefined) return
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  async function handleFileRead() {
    const content = fileReader.result
    toContactTemplate(content)
  }

  function toContactTemplate(csv: any) {
    let fields = csv.split(';')
    let fieldArray: ContactField[] = []
    fields.forEach((field: string, index: number) => {
      let newField: ContactField = {
        id: index,
        name: field,
        displayName: field.split('[')[0].trim(),
        selected: false,
      }
      if (field.includes('short dial'))
        newField.displayName = newField.displayName + ' Kurzwahl'
      fieldArray.push(newField)
    })
    let contactTemplate: ContactTemplate = {
      fields: fieldArray,
    }
    setContactTemplate(contactTemplate)
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="header-text mb-4">Starface Template-Datei</p>
        <p className="info-text mb-4">
          Die Template-Datei aus der Starface-Anlage bestimmt, welche
          Eigenschaften Sie in das System importieren können. <br />
          Die Datei finden Sie unter{' '}
          {'"Adressbuch" -> "Importieren" -> "Herunterladen"'} <br /> in Ihrer
          Starface Web-Oberfläche
          <div className="mt-2">
            <strong>Vorsicht:</strong> Sie können nur die in der hochgeladenen
            Datei gelisteten Eigenschaften mit Daten füllen. Die Eigenschaften
            der Datei entsprechen den derer, die Sie beim manuellen Anlegen
            eines Kontaktes angeben müssten.
          </div>
        </p>
        <p className="mt-2 text-3xl font-bold ">
          Laden Sie hier die Template-Datei aus Starface hoch
        </p>
        <div className="mt-2 flex items-center justify-center">
          <input
            accept=".csv"
            name="file"
            type="file"
            onChange={(e) => {
              // @ts-ignore
              handleChosenFile(e.target.files[0])
            }}
            className="file-input"
          />
        </div>
        <button
          className="mt-2 text-blue-700 underline"
          onClick={deleteFileContent}
        >
          Kundendatei ändern
        </button>
      </div>
    </div>
  )
}

export default TemplateSelector
