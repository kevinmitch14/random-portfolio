import React from 'react'
import './Styles/App.css'
import Results from './Components/Results'
import Header from './Components/Header'
import { useSelector } from 'react-redux'

function App() {
  const { error } = useSelector(state => state)
  return (
    <div className="App">
      <Header />
      {error && <h2 style={{ color: 'red' }}>Can't load S&#38;P Stocks: {error}</h2>}
      <Results />
    </div>
  );
}


export default App;
