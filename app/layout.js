export const metadata = {
  title: '𝖫Ξ𝖮⟁𝗘𝗬Ξ - OSINT Hub',
  description: 'Advanced Intelligence',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style={{ margin: 0, backgroundColor: '#050505' }}>
        {children}
      </body>
    </html>
  )
}

