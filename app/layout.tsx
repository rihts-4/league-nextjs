import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'League Web App',
  description: 'A modern sports league management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  League Web
                </h1>
              </div>
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Leagues
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Teams
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Players
                </a>
                <a href="#" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Sign In
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">League Web</h3>
                <p className="text-gray-400 text-sm">
                  Modern sports league management platform for teams, players, and fans.
                </p>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3">Features</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>League Management</li>
                  <li>Team Statistics</li>
                  <li>Player Profiles</li>
                  <li>Match Scheduling</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3">Quick Links</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white">Dashboard</a></li>
                  <li><a href="#" className="hover:text-white">Standings</a></li>
                  <li><a href="#" className="hover:text-white">Fixtures</a></li>
                  <li><a href="#" className="hover:text-white">Results</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium mb-3">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2025 League Web. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}