import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

const PortfolioGraphs = () => {
    const [data, setData] = useState({})
    const { numberStocks, historicalData } = useSelector(state => state)

    useEffect(() => {
        let testingData = {}


        historicalData.forEach((item, index) => {
            let startingPrice = item.data.o[0];

            for (let i = 0; i < item.data.o.length; i++) {
                let nextPrice = item.data.c[i]
                let diff = ((nextPrice - startingPrice) / startingPrice) * 100
                let newValue = testingData[i] + diff
                i in testingData ? testingData[i] = newValue : testingData[i] = diff
                startingPrice = item.data.c[i]
            }
        });

        setData(testingData)
    }, [historicalData])


    let portfolioSize = 1000
    const portfolioData = Object.keys(data).map((item) => {
        portfolioSize = portfolioSize + (portfolioSize * (data[item] / numberStocks) / 100)
        let percentChange = data[item] / numberStocks
        let day = `Day ${item}`
        return { day, percentChange, portfolioSize }
    })


    const barChart = (
        <ResponsiveContainer width={"95%"} height={500}>
            <BarChart data={portfolioData}>
                <Tooltip />
                <YAxis />
                <XAxis dataKey='day' />
                <Bar type="monotone" dataKey="percentChange" fill="#06d6a0">
                    {portfolioData.map((entry, index) => {
                        return (entry.percentChange < 0 ? <Cell key={index} stroke={"#000000"} fill={'#d63706'} /> : <Cell key={index} stroke={"#000000"} fill={'#06d6a0'} />)
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

    const lineChart = (
        <ResponsiveContainer width="95%" height={500}>
            <LineChart data={portfolioData} >
                <Tooltip />
                <XAxis />
                <YAxis dataKey='portfolioSize' domain={[500, 1500]} />
                <Line type="monotone" dataKey="portfolioSize" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )


    return (
        <>
            {Object.keys(data).length > 0 &&
                <div className='test'>
                    <Accordion defaultExpanded={true} TransitionProps={{ unmountOnExit: true }} style={{ backgroundColor: '#ffffff', borderRadius: "0px", borderBottom: '1px solid black' }}>
                        <AccordionSummary
                            style={{ backgroundColor: '#7aaef3' }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Portfolio</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ paddingLeft: '0', paddingRight: '20px' }}>
                            <Typography component={'span'} style={{ width: '100%' }}>
                                <div className="portfolio-graph">
                                    {barChart}
                                    {lineChart}
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            }
        </>
    )
}

export default PortfolioGraphs
