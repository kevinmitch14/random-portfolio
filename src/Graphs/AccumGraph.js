import React from 'react'
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

const AccumGraph = ({ data }) => {
    let portfolioSize = 1000

    let oldPrice = data.o[0]
    const y = data.o.map((item1, index) => {
        let diff = ((data.c[index] - oldPrice) / oldPrice)
        oldPrice = data.c[index]

        portfolioSize = portfolioSize + (portfolioSize * diff)

        let p = portfolioSize

        return { index, p }

    })

    const lineChart = (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={y}>
                <Tooltip />
                <CartesianGrid />
                <XAxis />
                <YAxis dataKey='p' domain={[700, 1500]} />

                <Line type="monotone" dataKey="p" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div className="AccumGraph">
            {lineChart}
        </div>
    )
}

export default AccumGraph
