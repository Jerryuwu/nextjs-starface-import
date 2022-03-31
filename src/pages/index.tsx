import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Data } from '@/pages/api/hello'
import Welcome from '@/components/welcome'
import { FileContent } from '@/pages/types/FileContentType'
import { useEffect, useState } from 'react'
import PropertyAssignment from '@/components/propertyassignment'
import TablePreview from '@/components/tablepreview'
import TemplateSelector from '@/components/templateSelector'
import { ContactTemplate } from '@/pages/types/ContactTemplate'

const Home: NextPage<Data> = ({ name }) => {
  const loadFileContent = (): FileContent | null => {
    const storageString = window.sessionStorage.getItem('filecontent')
    return storageString ? JSON.parse(storageString) : null
  }
  const loadContactTemplate = (): ContactTemplate | null => {
    const storageString = window.sessionStorage.getItem('contactTemplate')
    return storageString ? JSON.parse(storageString) : null
  }
  const deleteFileContent = (): void => {
    setFileContent(null)
  }
  const deleteContactTemplate = (): void => {
    setContactTemplate(null)
  }
  const deleteAssignedProperties = (): void => {
    setFileContent((current) => {
      if (current === null) return null
      current.columns.forEach((header) => {
        header.header.selectedProperty = false
      })
      return current
    })
    setContactTemplate((current) => {
      if (current === null) return null
      current.fields.forEach((field) => {
        field.selected = false
      })
      return current
    })
    setPropsSet(false)
  }

  const [fileContent, setFileContent] = useState<FileContent | null>(null)
  const [isPropsSet, setPropsSet] = useState<boolean>(false)
  const [contactTemplate, setContactTemplate] =
    useState<ContactTemplate | null>(null)

  useEffect(() => {
    setFileContent(loadFileContent)
    setContactTemplate(loadContactTemplate)
  }, [])

  useEffect(() => {
    sessionStorage.setItem('filecontent', JSON.stringify(fileContent))
    console.log(fileContent)
  }, [fileContent])
  useEffect(() => {
    sessionStorage.setItem('contactTemplate', JSON.stringify(contactTemplate))
  }, [contactTemplate])

  function returnToStartingPage() {
    if (fileContent === null) return
    deleteFileContent()
    deleteContactTemplate()
    setPropsSet(false)
  }

  return (
    <div className="flex-1">
      <Head>
        <title>Nexave Importer</title>
      </Head>
      <div className="mb-2 flex justify-center">
        <button
          className="my-1 text-blue-700 underline"
          onClick={returnToStartingPage}
        >
          Zurück zur Startseite
        </button>
      </div>

      {fileContent === null ? (
        <Welcome setFileContent={setFileContent} />
      ) : contactTemplate === null ? (
        <TemplateSelector
          setContactTemplate={setContactTemplate}
          deleteFileContent={deleteFileContent}
        />
      ) : !isPropsSet ? (
        <PropertyAssignment
          setContactTemplate={setContactTemplate}
          setFileContent={setFileContent}
          deleteContactTemplate={deleteContactTemplate}
          contactTemplate={contactTemplate}
          fileContent={fileContent}
          setPropsSet={setPropsSet}
        />
      ) : (
        <TablePreview
          contactTemplate={contactTemplate}
          fileContent={fileContent}
          setPropsSet={deleteAssignedProperties}
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
