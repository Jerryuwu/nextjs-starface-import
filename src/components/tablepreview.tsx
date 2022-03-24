import {
  CsvBodyRow,
  CsvHeaderType,
  FileContentType,
} from '@/pages/types/FileContentType'
import { SelectedPropertiesType } from '@/pages/types/SelectedPropertiesType'

type TablePreviewProps = {
  fileHeaders: CsvHeaderType[]
  fileContent: FileContentType
  selectedProperties: SelectedPropertiesType
  deleteFileHeaders(): void
}
type TableContent = {
  columns: Column[]
}
type Column = {
  entries: string[]
}

const TablePreview = ({
  fileHeaders,
  fileContent,
  selectedProperties,
  deleteFileHeaders,
}: TablePreviewProps) => {
  let content: TableContent = {
    columns: [],
  }

  function orderFileContent() {
    fileContent.body.forEach((entry) => {
      let column: Column = {
        entries: [],
      }
      let i = 0
      fileHeaders.forEach((header, index) => {
        if (header.selected === false) return
        //check if first- and lastname have to be seperated
        let prop = selectedProperties.properties[header.selected]
        if (prop.property === 'Name') {
          let name = entry.columns[index]
          let names = name.split(' ')
          column.entries[header.selected] = names[0]
          column.entries[header.selected + 1] = names[1]
          i = 1
        } else column.entries[header.selected + i] = entry.columns[index]
      })
      content.columns.push(column)
    })
  }

  orderFileContent()

  function deleteHeaders() {
    deleteFileHeaders()
  }

  return (
    <div className="mb-4 flex flex-col items-center justify-center text-center text-center">
      <p className="header-text mb-4">Datenübersicht </p>
      <p className="info-text mb-4">
        Bitte stellen Sie sicher, dass alle Daten in den entsprechenden Spalten
        vorhanden sind.
      </p>
      <div className="mt-1 mb-4">
        <button className="text-blue-700 underline" onClick={deleteHeaders}>
          zurück zur Zuordnung
        </button>
      </div>
      <table className="border border-2 border-gray-700">
        <thead className="bg-primary text-xl">
          <tr>
            {selectedProperties.properties.map((prop) => {
              if (prop.property === 'Name') {
                return (
                  <>
                    <th className="border border-black px-2">Vorname</th>
                    <th className="border border-black px-2">Nachname</th>
                  </>
                )
              }
              return (
                <th className="border border-black px-2">{prop.property}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {content.columns.map((col) => {
            return (
              <tr className="">
                {col.entries.map((e) => {
                  return (
                    <td className="border border-gray-500 py-1 px-2">{e}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default TablePreview
