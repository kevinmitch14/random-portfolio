import React, { useEffect, useState } from 'react'
import gsap from 'gsap/gsap-core';
import { useDispatch, useSelector } from 'react-redux'
import { inputHandler, SP_Fetcher, testingFetch } from '../state/actions'
import CssTextField from './MaterialUI/CSSTextField'

const timeNow = Math.round(new Date().getTime() / 1000)

const Header = ({ setCustomVisible, fetcher }) => {
    const [test, setTest] = useState([])
    const [data, setData] = useState([])
    const [extraData, setExtraData] = useState([])
    const [randomStocks, setRandomStocks] = useState([])
    const [stockCount, setStockCount] = useState('')
    const [dayCount, setDayCount] = useState('')
    const dispatch = useDispatch()
    const { numberDays, numberStocks } = useSelector(state => state)

    useEffect(() => {
        dispatch(SP_Fetcher())
        gsap.from('.Header', { opacity: 0, duration: 1, y: -100 })
    }, [dispatch])



    useEffect(() => {
        const HWG = async () => {
            try {
                let data = await fetch(`https://finnhub.io/api/v1/index/constituents?symbol=^GSPC&token=bv4bhc748v6qpatdfb4g`)
                data = await data.json()
                data = data.constituents
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        HWG()
    }, [])


    useEffect(() => {
        for (let i = 0; i < numberStocks; i++) {
            const element = data[Math.floor((Math.random() * data.length))];
            console.log(element)
            setRandomStocks((prevState) => [...prevState, element])
        }
    }, [data, numberStocks])


    useEffect(() => {
        const fetcher = async () => {
            Promise.all(randomStocks.map(stock => fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=${timeNow - (numberDays * 86400)}&to=${timeNow}&token=bv4bhc748v6qpatdfb4g`)))
                .then(responses =>
                    Promise.all(responses.map(res => res.json())))
                .then(data => setTest(data))
        }
        fetcher()

    }, [numberDays, randomStocks])

    useEffect(() => {
        test.map((item, index) => {
            let elem = {
                name: randomStocks[index],
                data: item
            }
            return (setExtraData((prevState) => [...prevState, elem]))

        })
    }, [randomStocks, test])


    useEffect(() => {
        dispatch(testingFetch(extraData))
    }, [dispatch, extraData])



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
            <button className="submit-button" onClick={async () => {
                dispatch(inputHandler(stockCount, dayCount))
                // dispatch(testingFetch(test))
            }}>Calculate</button>

        </div>
    )
}

export default Header;
