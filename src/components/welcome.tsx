import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import {
  CsvBodyRow,
  CsvHeaderType,
  FileContentType,
} from '@/pages/types/FileContentType'
import Link from 'next/link'
import Head from 'next/head'

type WelcomeProps = {
  setFileContent: Dispatch<SetStateAction<FileContentType | null>>
}

function Welcome({ setFileContent }: WelcomeProps) {
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState()
  let fileReader: FileReader
  let headers
  let fileContent: FileContentType

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
    let i = 0
    let headers: Array<CsvHeaderType> = []
    lines[0].split(';').forEach((header: string) => {
      let headerProp: CsvHeaderType = {
        id: i,
        property: header,
        selected: false,
      }
      headers.push(headerProp)
    })

    //headers = lines[0].split(';')
    let rows: Array<CsvBodyRow> = []

    for (let i = 1; i < lines.length - 1; i++) {
      let row: CsvBodyRow = {
        columns: lines[i].split(';'),
      }
      rows.push(row)
    }
    fileContent = {
      header: headers,
      body: rows,
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
          Dieses Tool ermöglicht Ihnen, jegliche Kundendaten aus anderen
          Programmen in die Starface-Anlage zu importieren. <br />
          Für den Import benötigt wird eine CSV-Datei. Hilfe zur Umwandlung
          finden Sie unten. Nachdem Sie Ihre Datei in unser System hochgeladen
          haben, kommen Sie zu einer Auswahl an Eigenschaften. In diesem Fenster
          geben Sie an, welche Eigenschaften später in die Starface-Anlage
          importiert werden sollen. <br />
          Im nächsten Fenster ordenen Sie den ausgewählten Eigenschaften den
          Eigenschaften aus der Tabelle zu. Näheres finden Sie auf der
          entsprechenden Seite.
        </p>

        <div className="mt-6 flex items-center justify-center">
          <input
            accept=".csv"
            name="file"
            type="file"
            onChange={(e) => {
              // @ts-ignore
              setSelectedFile(e.target.files[0])
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
