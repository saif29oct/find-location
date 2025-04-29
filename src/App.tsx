import React from 'react';
import './App.css';
import './index.css';
import { FindResturant } from './Layouts/FindResturant';
import {TestComponent} from "./components/TestComponent";

function App() {
  return (
    <div className="App">
      <FindResturant />
        {/*<TestComponent />*/}
    </div>
  );
}

export default App;
