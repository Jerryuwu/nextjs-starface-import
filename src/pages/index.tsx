import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Data } from '@/pages/api/hello'
import Welcome from '@/components/welcome'
import { CsvHeaderType, FileContentType } from '@/pages/types/FileContentType'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import Configuration from '@/components/configuration'
import { SelectedPropertiesType } from '@/pages/types/SelectedPropertiesType'
import PropertyAssignment from '@/components/propertyassignment'
import Tablepreview from '@/components/tablepreview'
import HeadComponent from '@/components/HeadComponent'

const Home: NextPage<Data> = ({ name }) => {
  const loadFileContent = (): FileContentType | null => {
    const storageString = window.sessionStorage.getItem('filecontent')
    return storageString ? JSON.parse(storageString) : null
  }
  const loadSelectedProperties = (): SelectedPropertiesType | null => {
    const storageString = window.sessionStorage.getItem('selected-props')
    return storageString ? JSON.parse(storageString) : null
  }
  const loadHeaders = (): CsvHeaderType[] | null => {
    const storageString = window.sessionStorage.getItem('headers')
    return storageString ? JSON.parse(storageString) : null
  }
  const deleteFileContent = (): void => {
    setFileContent(null)
  }
  const deleteSelectedProperties = (): void => {
    setSelectedProperties(null)
  }
  const deleteFileHeaders = (): void => {
    setFileHeaders(null)
    let headers: CsvHeaderType[] = []
    fileContent!.header.forEach((header) => {
      let newHeader = header
      newHeader.selected = false
      headers.push(newHeader)
    })
    let newFileContent = fileContent
    newFileContent!.header = headers
    setFileContent(newFileContent)
    console.log(fileContent)
  }

  const [fileContent, setFileContent] = useState<FileContentType | null>(null)
  const [selectedProperties, setSelectedProperties] =
    useState<SelectedPropertiesType | null>(null)
  const [fileHeaders, setFileHeaders] = useState<CsvHeaderType[] | null>(null)

  useEffect(() => {
    setFileContent(loadFileContent)
    setSelectedProperties(loadSelectedProperties)
    setFileHeaders(loadHeaders)
  }, [])

  useEffect(() => {
    sessionStorage.setItem('filecontent', JSON.stringify(fileContent))
  }, [fileContent])
  useEffect(() => {
    sessionStorage.setItem('selected-props', JSON.stringify(selectedProperties))
  }, [selectedProperties])
  useEffect(() => {
    sessionStorage.setItem('headers', JSON.stringify(fileHeaders))
  }, [fileHeaders])

  function returnToStartingPage() {
    deleteFileHeaders()
    deleteFileContent()
    deleteSelectedProperties()
  }

  return (
    <div className="flex-1">
      <Head>
        <title>Nexave Importer</title>
      </Head>
      <div className="my-2 flex justify-center">
        <button
          className="text-blue-700 underline"
          onClick={returnToStartingPage}
        >
          Zurück zur Startseite
        </button>
      </div>

      {fileContent === null ? (
        <Welcome setFileContent={setFileContent} />
      ) : selectedProperties === null ? (
        <Configuration
          deleteFileContent={deleteFileContent}
          setSelectedProperties={setSelectedProperties}
        />
      ) : fileHeaders === null ? (
        <PropertyAssignment
          fileContent={fileContent}
          setFileHeaders={setFileHeaders}
          deleteSelectedProperties={deleteSelectedProperties}
          selectedProperties={selectedProperties}
        />
      ) : (
        <Tablepreview
          deleteFileHeaders={deleteFileHeaders}
          fileHeaders={fileHeaders}
          selectedProperties={selectedProperties}
          fileContent={fileContent}
        />
      )}
    </div>
  )
}

/*export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/hello')
  const json = await response.json()
  return {
    props: json,
  }
}*/

export default Home
