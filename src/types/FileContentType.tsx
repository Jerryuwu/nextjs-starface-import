import { ContactField } from '@/types/ContactTemplate'

export type FileContent = {
  columns: CsvColumn[]
}

export type CsvHeader = {
  id: number
  property: string
  selectedProperty: ContactField | false
}
export type CsvColumn = {
  id: number
  rows: string[]
  header: CsvHeader
}
export default FileContent
