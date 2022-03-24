import { CsvHeaderType } from '@/pages/types/FileContentType'
import { ChangeEvent, useEffect, useState } from 'react'
import { func } from 'prop-types'

type PropertyTableType = {
  propertyName: string
  id: number
  headers: Array<CsvHeaderType>
  onSelect: (propertyId: number, headerId: number) => void
}

function PropertyTable({
  headers,
  propertyName,
  id,
  onSelect,
}: PropertyTableType) {
  function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
    const headerId = e.target.options[e.target.selectedIndex].value
    onSelect(id, Number(headerId))
  }

  return (
    <div className="w-48 rounded rounded-lg bg-orange-200 text-2xl font-bold">
      <div className="bg-primary">{propertyName}</div>
      <div className="p-2">
        <select onChange={changeHandler} className="rounded rounded-lg px-2">
          <option selected={true} disabled={true}>
            Auswählen
          </option>
          {headers.map((head, index) => {
            return (
              <option
                key={index}
                value={index}
                disabled={head.selected !== false && head.selected !== id}
              >
                {head.property}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default PropertyTable
