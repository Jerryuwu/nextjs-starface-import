export type ContactTemplate = {
  fields: ContactField[]
}
export type ContactField = {
  id: number
  name: string
  displayName: string
  selected: false | number
}
