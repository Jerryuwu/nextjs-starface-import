export type SelectedPropertiesType = {
  properties: Array<SelectablePropertyType>
}
export type SelectablePropertyType = {
  id: number
  property: string
  selected: number | false
}
