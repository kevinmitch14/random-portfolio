import React, { useEffect, useState } from 'react'
import axios from 'axios'
import data from './data'
import Results from './Results'
import StockNews from './StockNews'
import StockChart from './StockChart'
import TextField from '@material-ui/core/TextField';
import './App.css'

function App() {
  const [numberStocks, setNumberStocks] = useState(0)
  const [numberDays, setNumberDays] = useState(0)

  const [randomArr, setRandomArr] = useState([])

  const [fetching, setFetching] = useState(true)
  const [test, setTest] = useState([])


  const [showChart, setShowChart] = useState(true)
  console.log(showChart)

  const timeNow = Math.round(new Date().getTime() / 1000)






  const [stock, stockChange] = useState("")
  const [query, setQuery] = useState("")

  // const stockHandler = <input label="Choose Stock" autoComplete='off' id="w" type="text" onChange={(e) => stockChange(e.target.value)}></input>
  const stockHandler = <TextField id="s" label="Choose a Stock" style={{ marginRight: '0rem' }} autoComplete='off' onChange={(e) => stockChange(e.target.value)} />
  const stockSubmit = <button style={{ marginRight: '10rem', backgroundColor: '#7af384' }} onClick={() => setQuery(stock)}>Change Stock</button>
  console.log(stock)
  console.log(query)

  useEffect(() => {
    for (let i = 0; i < numberStocks; i++) {
      const element = data[Math.floor((Math.random() * data.length - 1))];
      setRandomArr((prevState) => [...prevState, element])

    }
  }, [numberStocks])


  const fetch = () => {
    randomArr.map((item) => (
      axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${item.Symbol}&resolution=D&from=${timeNow - (numberDays * 86400)}&to=${timeNow}&token=bv4bhc748v6qpatdfb4g`)
        .then(res => {
          setTest((prevState) => [...prevState, { item, res }])
          setFetching(false)
        })
    ))
  }


  return (
    <div className="App">
      <div className="Header">
        {/* {stockHandler} */}
        {/* {stockSubmit} */}
        <TextField id="stock-input" label="# of Stocks" autoComplete='off' onChange={(event) => { setNumberStocks(event.target.value); event.preventDefault() }} />
        <TextField id="day-input" label="# of Days" autoComplete='off' onChange={(event) => { setNumberDays(event.target.value); event.preventDefault() }} />
        {numberStocks === 0 ?
          <button onClick={() => alert("Enter number of stocks.")}>Calculate</button> : numberDays === 0 ?
            <button onClick={() => alert("Enter number of Days.")}>Calculate</button> :
            <button onClick={() => { setRandomArr([]); setTest([]); fetch(); setShowChart(false) }}>Calculate</button>
        }
      </div>


      {fetching ? null
        :
        <Results test={test}
        />}
      <div className="testing">
        {console.log(stock)}

        {/* {showChart ? <><StockChart query={query} /> <StockNews query={query} /></> : null} */}
      </div>

    </div>
  );
}


export default App;
