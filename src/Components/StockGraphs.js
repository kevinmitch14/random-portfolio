import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux'
import AccumGraph from './Graphs/AccumGraph'
import DailyGraph from './Graphs/DailyGraph'

const StockGraphs = () => {
    const { historicalData } = useSelector(state => state)


    const stockGraphs = historicalData.map((item) => {

        return (
            <>
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography component={'span'} className={"s"}>{item.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component={'span'} style={{ width: '100%' }}>
                            <div style={{ display: 'flex' }}>
                                <DailyGraph data={item.data} />
                                <AccumGraph data={item.data} />
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    })


    return (
        <div>
            {stockGraphs}
        </div>
    )
}

export default StockGraphs
