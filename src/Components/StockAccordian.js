import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux'
import IndividualStockGraphs from './Graphs/IndividualStockGraphs'

const StockAccordian = () => {
    const { historicalData, investment } = useSelector(state => state)

    return (
        <>
            {historicalData && historicalData.map((item, idx) => {
                const barChartPoints = item[1].o.map((item1, index) => {
                    let percentChange = ((item[1].c[index] - item1) / item1) * 100
                    let indexChange = `Day ${index}`
                    return { indexChange, percentChange }
                })

                let portfolioSize = investment
                let oldPrice = item[1].o[0]
                const y = item[1].o.map((item1, index) => {
                    let diff = ((item[1].c[index] - oldPrice) / oldPrice)
                    oldPrice = item[1].c[index]
                    portfolioSize = portfolioSize + (portfolioSize * diff)
                    let p = portfolioSize
                    return { index, p }
                })

                return (
                    <div className='StockAccordian' key={idx}>
                        <Accordion TransitionProps={{ unmountOnExit: true }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography component={'span'} className={"s"}>{item[0].name} - {item[0].ticker}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component={'span'} style={{ width: '100%' }}>
                                    <IndividualStockGraphs data={item[1]} barChartPoints={barChartPoints} y={y} />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )
            })}

        </>
    )
}

export default StockAccordian
