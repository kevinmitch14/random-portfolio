import React from 'react'
import Charts from './Charts'
import PortfolioGraphs from './Graphs/PortfolioGraphs'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Results = (props) => {
    console.log(props.test)

    let accumPercent = {}

    const y = props.test.map((item) => {

        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography component={'span'} className={"s"}>{item.item.Symbol} - {item.item.Name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component={'span'} style={{ width: '100%' }}>
                            <Charts data={item.res.data} />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    })

    const portfolio = props.test.map((item) => {
        // console.log(item)
        let oldPrice = item.res.data.o[0]
        item.res.data.o.map((item1, index) => {
            let diff = ((item.res.data.c[index] - oldPrice) / oldPrice) * 100
            // console.log(diff)

            if (index in accumPercent) {
                let newValue = accumPercent[index] + diff
                accumPercent[index] = newValue
            } else {
                accumPercent[index] = diff
            }

            oldPrice = item.res.data.c[index]

        })
    })

    return (
        <div>
            {Object.keys(accumPercent).length > 0 ?
                <PortfolioGraphs data={accumPercent}
                    length={props.test.length} />

                : null}

            {/* {Object.keys(accumPercent).length > 0 ?
                <PortfolioSummary data={accumPercent}
                    length={props.test.length} />
                : null} */}

            {y}
        </div>
    )
}

export default Results
