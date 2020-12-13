import React from 'react'
import AccumGraph from './Graphs/AccumGraph'
import DailyGraph from './Graphs/DailyGraph'

const Charts = ({ data }) => {

    return (
        <div className="Charts">
            <>
                <DailyGraph data={data} />
                <AccumGraph data={data} />
            </>
        </div>
    )
}

export default Charts
