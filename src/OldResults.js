import React, { useEffect } from 'react'
import AccumGraph from './AccumGraph'
import DailyGraph from './DailyGraph'
import Charts from './Charts'

const Results = (props) => {


    const x = () => props.randomArr.map((item) => {
        return (

            <div className="Results">
                <>
                    <h2>{item.Name}</h2>
                    {/* <Charts data={item.open.data} /> */}


                    {/* 
                    {item.open.data.o.map((item1, index) => {

                        return (
                            <>
                                <p>Day {index + 1}</p>
                                <p>{Math.round((item1 + Number.EPSILON) * 100) / 100} to {item.open.data.c[index]}</p>
                                <p>Total Percentage gain: {((item.closing.data.c - item1) / item1) * 100}</p>

                                <p>Daily Open: {item.open.data.o[index]}</p>
                                <p>Daily Closing: {item.open.data.c[index]}</p>
                                <p>Daily P+L: {item.open.data.c[index] - Math.round((item1 + Number.EPSILON) * 100) / 100}</p>
                                <p>daily P+L as % {(item.open.data.c[index] - Math.round((item1 + Number.EPSILON) * 100) / 100) / (item.open.data.o[index]) * 100}</p>
                                <p>==========</p>

                            </>
                        )
                    }
                    )} */}

                </>
            </div >

        )
    })


    return (
        <div className="Results">
            {x}
        </div>
    )
}

export default Results
