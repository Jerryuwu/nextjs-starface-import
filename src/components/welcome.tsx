import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { CsvColumn, CsvHeader, FileContent } from '@/types/FileContentType'
import Link from 'next/link'
import Head from 'next/head'

type WelcomeProps = {
  setFileContent: Dispatch<SetStateAction<FileContent | null>>
}

function Welcome({ setFileContent }: WelcomeProps) {
  let fileReader: FileReader
  let fileContent: FileContent

  // @ts-ignore
  function handleChosenFile(file) {
    if (file === undefined) return
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  async function handleFileRead() {
    const content = fileReader.result
    csvJSON(content)
  }

  // @ts-ignore
  //turn csv into FileContentType object and save it to session storage
  function csvJSON(csv) {
    let lines = csv.split('\r\n')
    let headers: Array<CsvHeader> = []
    lines[0].split(';').forEach((header: string, index: number) => {
      let headerProp: CsvHeader = {
        id: index,
        property: header,
        selectedProperty: false,
      }
      headers.push(headerProp)
    })
    let columns: Array<CsvColumn> = []
    for (let i = 0; i < lines[0].split(';').length; i++) {
      let column: CsvColumn = {
        id: i,
        rows: [],
        header: headers[i],
      }
      columns.push(column)
    }
    for (let i = 0; i < lines.length - 1; i++) {
      let entries = lines[i].split(';')
      entries.forEach((col: string, index: number) => {
        columns[index].rows[i - 1] = col
      })
    }
    fileContent = {
      columns: columns,
    }
    setFileContent(fileContent)
  }

  function onLogin() {
    //TODO: find way to check file type
    return false
  }

  return (
    <>
      <Head>
        <title>Nexave Importtool</title>
      </Head>

      <div className="flex flex-col items-center justify-center text-center">
        <p className="header-text mb-4">
          Willkommen im Starface Importtool von Nexave!
        </p>
        <p className="info-text mb-4">
          Dieses Tool ermöglicht Ihnen, Kundendaten aus anderen Programmen in
          die Starface-Anlage zu importieren. <br />
          Für den Import werden zwei Dateien benötigt:
          <br />
          1. Ihre <strong>Kundendaten</strong>, formatiert als CSV <br />
          2. Die <strong> Importdatei aus Starface</strong>
          <br />
          Zunächst beginnen Sie damit, die Kundendaten hochzuladen. Sie werden
          dann automatisch weitergeleitet, um die Importdatei aus Starface
          hochzuladen. <br /> Genaueres dazu ist dort zu finden.
        </p>
        <p className="mt-2 text-3xl font-bold ">
          Laden Sie hier Ihre Kundendaten hoch:
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
        <div className="pt-2 text-center">
          <Link href="/csvhelp">
            <a className="text-base text-blue-600 underline">
              Wie wandel ich eine Excel zur CSV-Datei um?
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Welcome
