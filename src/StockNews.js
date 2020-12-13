import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StockNews = ({ query }) => {
    const [stockNews, setStockNews] = useState([])
    const [companyNews, setCompanyNews] = useState([])
    const [detailedNews, setDetailedNews] = useState(false)

    useEffect(() => {
        const fetchNews = async () => {
            axios.get(`https://finnhub.io/api/v1/news?category=general&token=bv4bhc748v6qpatdfb4g`)
                .then(res => setStockNews(res.data))
        }
        fetchNews()
    }, [])


    useEffect(() => {
        const fetchCompanyNews = async () => {
            axios.get(`https://finnhub.io/api/v1/company-news?symbol=${query}&from=2020-10-30&to=${new Date().toISOString().slice(0, 10)}&token=bv4bhc748v6qpatdfb4g`)
                .then(res => setCompanyNews(res.data))
        }
        fetchCompanyNews()
    }, [query])

    const newsFeed = stockNews.slice(0, 20).map((item) => {
        return (
            <div className="news-item">
                <span>{item.headline} - {item.source}</span>
                <br></br>
                <span>{item.summary}</span>
            </div>
        )
    })


    const companyNewsFeed = companyNews.slice(0, 20).map((item) => {
        return (
            <div className="news-item">
                <span>{item.headline} - {item.source}</span>
                <br></br>
                <span>{item.summary}</span>
            </div>
        )
    })


    return (
        <div className="news-feed">
            <p>News</p>
            {/* {newsFeed}
            {companyNewsFeed} */}
            {query !== "" ? companyNewsFeed : newsFeed}
        </div>
    )
}

export default StockNews
