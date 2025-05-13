import './App.css'
import NavigationMenu from "./components/NavigationMenu.tsx";
import Title from "./components/Title.tsx";
import {FindLocations} from "./components/FindLocations.tsx";
import ArticleSection from "./components/ArticleSection.tsx";
function App() {

  return (
      <div className="min-h-screen bg-gray-50">
          <header>
              <NavigationMenu/>
              <Title/>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-6">
                      {/* Main Content Area */}
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                          <FindLocations/>
                      </div>
                  </div>

                  {/* Right Column */}
                  <ArticleSection/>
              </div>
          </main>
      </div>
  )
}

export default App
