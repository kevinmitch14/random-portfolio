import React from 'react'
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';


const DailyGraph = ({ data }) => {


    const f = data.o.map((item1, index) => {
        let percentChange = ((data.c[index] - item1) / item1) * 100
        let indexChange = `Day ${index}`
        return { indexChange, percentChange }
    })

    console.log(f)

    const barChart = (

        <ResponsiveContainer width={"100%"} height={400}>
            <BarChart data={f}>
                <Tooltip />
                <XAxis dataKey='indexChange' />
                <Bar type="monotone" dataKey="percentChange" fill="#06d6a0">
                    {
                        f.map((entry, index) => {
                            return (
                                entry.percentChange < 0 ? <Cell key={index} stroke={"#000000"} fill={'#d63706'} /> : <Cell key={index} stroke={"#000000"} fill={'#06d6a0'} />
                            )
                        })
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="DailyGraph">
            {barChart}
        </div>
    )
}

export default DailyGraph
