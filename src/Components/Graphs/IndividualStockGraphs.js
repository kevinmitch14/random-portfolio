import React from 'react'
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell, Line } from 'recharts';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import YAxis from 'recharts/lib/cartesian/YAxis';
import LineChart from 'recharts/lib/chart/LineChart';


const DailyGraph = ({ data, barChartPoints, y }) => {

    const investment = useSelector(state => state.investment)

    // const barChartPoints = data.o.map((item1, index) => {
    //     let percentChange = ((data.c[index] - item1) / item1) * 100
    //     let indexChange = `Day ${index}`
    //     return { indexChange, percentChange }
    // })

    const barChart = (

        <ResponsiveContainer width={"99%"} height={400}>
            <BarChart data={barChartPoints}>
                <Tooltip />
                <YAxis />
                <XAxis dataKey='indexChange' />
                <Bar type="monotone" dataKey="percentChange" fill="#06d6a0">
                    {barChartPoints.map((entry, index) => {
                        return (
                            entry.percentChange < 0 ? <Cell key={index} stroke={"#000000"} fill={'#d63706'} /> : <Cell key={index} stroke={"#000000"} fill={'#06d6a0'} />
                        )
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );



    // let portfolioSize = 1000
    // console.log(data)



    // let oldPrice = data.o[0]
    // const y = data.o.map((item1, index) => {
    //     let diff = ((data.c[index] - oldPrice) / oldPrice)
    //     oldPrice = data.c[index]

    //     portfolioSize = portfolioSize + (portfolioSize * diff)

    //     let p = portfolioSize

    //     return { index, p }

    // })

    const lineChart = (
        <ResponsiveContainer width={'99%'} height={400}>
            <LineChart data={y}>
                <Tooltip />
                <CartesianGrid />
                <XAxis />
                <YAxis dataKey='p' domain={[investment - (investment * .2), investment + (investment * .2)]} />

                <Line type="monotone" dataKey="p" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div className="IndividualStockContainer">
            {barChart}
            {lineChart}
        </div>
    )
}

export default DailyGraph
