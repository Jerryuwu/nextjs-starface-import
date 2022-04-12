import { FileContent } from '@/types/FileContentType'
import { SelectedPropertiesType } from '@/types/SelectedPropertiesType'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ContactTemplate } from '@/types/ContactTemplate'

type TablePreviewProps = {
  fileContent: FileContent
  setPropsSet: Dispatch<SetStateAction<void>>
  contactTemplate: ContactTemplate
}
type TableContent = {
  columns: Column[]
}
type Column = {
  entries: string[]
}

const TablePreview = ({
  fileContent,
  setPropsSet,
  contactTemplate,
}: TablePreviewProps) => {
  function orderFileContent() {
    console.log(fileContent)
  }
  useEffect(() => {
    orderFileContent()
  })
  function deletePropertyAssignments() {
    setPropsSet()
  }
  function downloadCSV(csv: string) {
    var csvFile
    var downloadLink
    let BOM = '\uFEFF'
    csvFile = new Blob([BOM + csv], { type: 'text/csv; charset=utf-8' })
    downloadLink = document.createElement('a')
    downloadLink.download = 'starface_kundendaten'
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }
  function csvToFile() {
    let exportString = ''
    let newFields = contactTemplate.fields.filter(
      (field) => field.selected !== false
    )
    // @ts-ignore
    newFields = contactTemplate.fields.sort((a, b) => a.selected - b.selected)
    newFields.forEach((field) => {
      if (field.selected === false) return
      exportString += field.name + ';'
    })
    exportString += '\n'
    for (let i = 0; i < fileContent.columns[0].rows.length; i++) {
      fileContent.columns.forEach((col, index) => {
        if (col.header.selectedProperty === undefined) return
        exportString += col.rows[i] + ';'
      })
      exportString += '\n'
    }
    downloadCSV(exportString)

    console.table(exportString)
  }

  return (
    <div className="mb-4 flex flex-col items-center justify-center text-center text-center">
      <p className="header-text mb-4">Datenübersicht </p>
      <p className="info-text mb-4">
        Bitte stellen Sie sicher, dass alle Daten in den entsprechenden Spalten
        vorhanden sind.
      </p>
      <div className="flex gap-6">
        <button className="orange-button" onClick={csvToFile}>
          Als CSV herunterladen
        </button>
        <button disabled={true} className="orange-button">
          In Starface importieren
        </button>
      </div>
      <div className="mt-1 mb-4">
        <button
          className="text-blue-700 underline"
          onClick={deletePropertyAssignments}
        >
          zurück zur Zuordnung
        </button>
      </div>
      <table className="">
        <thead className="bg-primary text-xl">
          <tr>
            {fileContent.columns.map((col) => {
              if (col.header.selectedProperty === false) return
              if (col.header.selectedProperty === undefined) return
              return (
                <td className="border border-black px-2 font-bold">
                  {col.header.selectedProperty.displayName}
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {fileContent.columns.map((col) => {
            if (col.header.selectedProperty === undefined) return
            if (col.header.selectedProperty === false) return
            return (
              <tr className="border border-black">
                {col.rows.map((row) => {
                  return (
                    <td className="border-b-[1px] px-2 py-1 text-left">
                      {row === '' ? ' ' : row}
                    </td>
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
