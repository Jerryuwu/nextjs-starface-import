import Link from 'next/link'

function FooterComponent() {
  return (
    <div className="mt-auto flex justify-between border-t-2 border-gray-300 bg-primary text-center text-white">
      <div className="ml-2">© Ein Produkt von Nexave</div>
      <div className="mr-2">
        <Link href="https://nexave.com/impressum/">
          <a>Impressum</a>
        </Link>
      </div>
    </div>
  )
}

export default FooterComponent
