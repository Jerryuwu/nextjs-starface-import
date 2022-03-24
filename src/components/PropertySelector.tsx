import { ReactChild, ReactFragment, ReactPortal, useState } from 'react'

function PropertySelector(props: {
  option: string
  number: number
  // @ts-ignore
  sendSelected
}) {
  const [isSelected, setSelected] = useState(false)
  const [bgColour, setBgColour] = useState('bg-gray-100 text-black')
  return (
    <div>
      <button
        className={
          (isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-black') +
          ' w-40 rounded rounded-lg border py-2 text-xl font-bold'
        }
        onClick={(_) => {
          setSelected(!isSelected)
          props.sendSelected(!isSelected, props.number)
        }}
      >
        {props.option}
      </button>
    </div>
  )
}

export default PropertySelector
