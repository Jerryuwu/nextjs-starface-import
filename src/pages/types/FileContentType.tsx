export type FileContentType = {
  header: CsvHeaderType[]
  body: CsvBodyRow[]
}
export type CsvHeaderType = {
  id: number
  property: string
  selected: false | number
}
export type CsvBodyRow = {
  columns: string[]
}
