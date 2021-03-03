import React from 'react'
import './Styles/App.css'
import Results from './Components/Results'
import Header from './Components/Header'
import { useSelector } from 'react-redux'

function App() {
  const { error } = useSelector(state => state)

  return (
    <div className="App">
      <h1>{error}</h1>
      <Header />

      <Results
      />
    </div>
  );
}


export default App;
