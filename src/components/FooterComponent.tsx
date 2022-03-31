import Link from 'next/link'

function FooterComponent() {
  return (
    <div className="mt-auto flex flex-col items-center border-t-2 border-gray-300 bg-primary py-1 text-center text-white">
      <div className="">© Ein Produkt von Nexave</div>
      <div className="underline">
        <Link href="https://nexave.com/impressum/">
          <a>Impressum</a>
        </Link>
      </div>
    </div>
  )
}

export default FooterComponent
