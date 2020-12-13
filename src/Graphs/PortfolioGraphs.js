import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import React from 'react'
import { Bar, BarChart, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const PortfolioGraphs = ({ data, length }) => {

    console.log(data)
    console.log(length)

    const y = Object.keys(data).map((item) => {
        let percentChange = data[item] / length
        console.log(percentChange);
        let day = `Day ${item}`
        return { day, percentChange }
    })


    const barChart = (
        <ResponsiveContainer width={"95%"} height={500}>
            <BarChart data={y}>
                <Tooltip />
                <YAxis />
                <XAxis dataKey='day' />
                <Bar type="monotone" dataKey="percentChange" fill="#06d6a0">
                    {
                        y.map((entry, index) => {
                            return (
                                entry.percentChange < 0 ? <Cell key={index} stroke={"#000000"} fill={'#d63706'} /> : <Cell key={index} stroke={"#000000"} fill={'#06d6a0'} />
                            )
                        })
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

    let portfolioSize = 1000

    const x = Object.keys(data).map((item) => {
        portfolioSize = portfolioSize + (portfolioSize * (data[item] / length) / 100)
        let p = portfolioSize
        return { item, p }
    })



    const lineChart = (
        <ResponsiveContainer width="95%" height={500}>
            <LineChart data={x} >
                <Tooltip />
                {/* <CartesianGrid /> */}
                <XAxis />
                <YAxis dataKey='p' domain={[500, 1500]} />

                <Line type="monotone" dataKey="p" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )


    return (
        <>
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


                {/* <div className="portfolio-graph">
                {barChart}

                {lineChart}
            </div> */}
            </div>
        </>
    )
}

export default PortfolioGraphs
