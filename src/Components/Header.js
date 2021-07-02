import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap';
import { useDispatch, useSelector } from 'react-redux'
import { inputHandler, SP_Fetcher, testingFetch } from '../state/actions'
import CssTextField from './MaterialUI/CSSTextField'

const timeNow = Math.round(new Date().getTime() / 1000)

const Header = () => {
    const [asyncData, setAsyncData] = useState([])
    const [randomStocks, setRandomStocks] = useState([])
    const [stockCount, setStockCount] = useState('')
    const [dayCount, setDayCount] = useState('')
    const [investment, setInvestment] = useState(1000)
    const dispatch = useDispatch()
    const { numberDays, numberStocks, SPStocks } = useSelector(state => state)

    useEffect(() => {
        dispatch(SP_Fetcher())
        gsap.from('.Header', { opacity: 0, duration: 0.7, x: '-100%' })
    }, [dispatch])


    useEffect(() => {
        for (let i = 0; i < numberStocks; i++) {
            const element = SPStocks[Math.floor((Math.random() * SPStocks.length))];
            console.log(element)
            setRandomStocks((prevState) => [...prevState, element])
        }
    }, [numberStocks, SPStocks])


    useEffect(() => {
        const fetcher = async (stock) => {
            const results = await Promise.all([
                fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`),
                fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=${timeNow - (numberDays * 86400)}&to=${timeNow}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`)])
            const promises = results.map((res) => res.json())
            const finalData = await Promise.all(promises)
            return finalData
        }
        randomStocks.map((item) => {
            return (
                fetcher(item).then((res => setAsyncData((prevState) => [...prevState, res])))
            )
        })
    }, [numberDays, randomStocks])


    useEffect(() => {
        dispatch(testingFetch(asyncData))
    }, [dispatch, asyncData])

    return (
        <div className="Header">
            <CssTextField
                label="# of Stocks"
                variant="outlined"
                id="stock-input"
                autoComplete='off'
                value={stockCount}
                onChange={(event) => setStockCount(event.target.value)}
            />
            <CssTextField
                label="# of Days"
                variant="outlined"
                id="day-input"
                autoComplete='off'
                value={dayCount}
                onChange={(event) => setDayCount(event.target.value)}
            />
            <CssTextField
                label="Initial Investment"
                variant="outlined"
                id="investment-input"
                autoComplete='off'
                value={investment}
                onChange={(event) => setInvestment(event.target.value)}
            />
            <button className="submit-button" onClick={async () => {
                dispatch(inputHandler(stockCount, dayCount, parseInt(investment)))
            }}>Calculate</button>
        </div>
    )
}

export default Header;
