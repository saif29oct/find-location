import './App.css'
import {TestComponent} from "./components/TestComponent.tsx";

function App() {

  return (
      // <div className="min-h-screen bg-gray-50">
      //     <header>
      //         <NavigationMenu/>
      //         <Title/>
      //     </header>
      //     <main className="max-w-7xl mx-auto px-4 py-8">
      //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      //
      //             <section className="lg:col-span-2 space-y-4">
      //                 <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      //                     <FindLocations/>
      //                 </div>
      //             </section>
      //
      //             <section>
      //                 <ArticleSection/>
      //             </section>
      //
      //         </div>
      //     </main>
      // </div>

      <div>
          <TestComponent/>
      </div>
  )
}

export default App
