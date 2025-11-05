import { ReactNode } from 'react'

interface AppShellProps {
  header: ReactNode
  sidebar: ReactNode
  children: ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({ header, sidebar, children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        {sidebar}
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-900 text-white">
          {header}
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}