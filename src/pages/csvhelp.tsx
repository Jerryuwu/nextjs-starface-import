import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

function CSVhelp() {
  return (
    <>
      <Head>
        <title>Nexave CSV-Umwandlung</title>
      </Head>
      <div className="ml-6 mt-2 flex gap-1 text-blue-700 underline">
        <Image src="/arrow-left.svg" alt="Test" height="14" width="14" />
        <Link href="/">
          <a>Zurück zur Startseite</a>
        </Link>
      </div>
      <div className="ml-6 mt-2">
        <div className="text-4xl font-bold">
          Umwandlen einer Excel-Datei in eine CSV-Datei
        </div>
        <div className="ml-4 gap-2 pt-2">
          <div>
            <p className="text-2xl">Schritt 1:</p>
            Öffnen Sie die gewünschte Datei in Excel.
          </div>
          <div>
            <p className="text-2xl">Schritt 2:</p>
            Klicken Sie in der oberen linken Ecke auf "Datei".
          </div>
          <div>
            <p className="text-2xl">Schritt 3:</p>
            Klicken Sie auf "Exportieren" aus und wählen Sie anschließend
            "Dateityp ändern".
          </div>
          <p className="text-2xl">Schritt 4:</p>
          Dort wählen Sie jetzt unter "Andere Dateitypen" das Feld "CSV" aus.
          <p className="text-2xl">Schritt 5:</p>
          Anschließend drücken Sie auf "Speichern unter" und wählen den
          gewünschten Speicherort aus. <br />
          Sie können Excel nun schließen und die eben gespeicherte Datei auf der{' '}
          <Link href="/">
            <a className="text-blue-700 hover:underline">Startseite</a>
          </Link>{' '}
          auswählen.
        </div>
      </div>
    </>
  )
}

export default CSVhelp
