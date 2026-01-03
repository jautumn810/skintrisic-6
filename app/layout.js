import './globals.css'

export const metadata = {
  title: 'Skinstric',
  description: 'Sophisticated skincare',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

