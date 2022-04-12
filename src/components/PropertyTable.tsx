import { CsvHeader } from '@/types/FileContentType'
import { ChangeEvent, useEffect, useState } from 'react'
import { func } from 'prop-types'
import {
  SelectablePropertyType,
  SelectedPropertiesType,
} from '@/types/SelectedPropertiesType'
import { ContactField, ContactTemplate } from '@/types/ContactTemplate'
import { Field } from 'react-hook-form'

type PropertyTableType = {
  header: CsvHeader
  onSelect: (propertyId: number, headerId: number) => void
  fields: ContactField[]
}

function PropertyTable({ header, onSelect, fields }: PropertyTableType) {
  function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = e.target.options[e.target.selectedIndex].value
    onSelect(Number(selectedId), header.id)
  }

  return (
    <div className="w-68 rounded rounded-lg bg-orange-200 text-2xl font-bold shadow-2xl">
      <div className="bg-primary">{header.property}</div>
      <div className="p-2">
        <select onChange={changeHandler} className="rounded rounded-lg px-2">
          <option selected={true}>Nicht importieren</option>
          {fields.map((field, index) => {
            return (
              <option
                key={index}
                value={field.id}
                disabled={
                  field.selected !== false && field.selected !== header.id
                }
              >
                {field.displayName}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default PropertyTable
