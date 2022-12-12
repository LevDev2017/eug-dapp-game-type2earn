import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

import {
    PriceChartContainer
} from './styles'

const PriceChart = (props) => {
    const [targetPrice, setTargetPrice] = useState(0.0)

    const [chartState, setChartState] = useState({
        series: [{
            name: 'Price History',
            // data: [31, 40, 28, 51, 42, 109, 100]
            data: []
        }],
        options: {
            chart: {
                height: 350,
                foreColor: '#ccc',
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                color: 'red'
            },
            xaxis: {
                type: 'datetime',
                // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                categories: []
            },
            colors: [
                "#cc6600"
            ],
            fill: {
                gradient: {
                    enabled: true,
                    opacityFrom: 0.85,
                    opacityTo: 0
                }
            },
            grid: {
                borderColor: "#ffffff40",
                clipMarkers: true,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            markers: {
                size: 5,
                colors: ["#884400"],
                strokeColor: "#cc6600",
                strokeWidth: 3
            },
            tooltip: {
                theme: 'dark',
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        }
    })

    useEffect(() => {
        let ac = new AbortController()

        let add = false
        let price = 0.0

        if (targetPrice > 0) {
            add = true
            price = targetPrice
        }

        if (add === true) {
            setChartState(oldState => {
                let curTime = (new Date()).toString()
                let newData = oldState.series[0].data
                newData = [...newData, price]
                let newCategories = oldState.options.xaxis.categories
                newCategories = [...newCategories, curTime]

                return {
                    ...oldState,
                    series: [
                        {
                            ...oldState.series[0],
                            data: newData
                        }
                    ],
                    options: {
                        ...oldState.options,
                        xaxis: {
                            ...oldState.options.xaxis,
                            categories: newCategories
                        }
                    }
                }
            })
        }

        return () => ac.abort()
    }, [targetPrice])

    useEffect(() => {
        let ac = new AbortController()

        setInterval(() => {
            if (ac.signal.aborted === false) {
                setTargetPrice(Math.round(Math.random() * 1000 * 1000) / 1000)
            }
        }, 10000)

        return () => ac.abort()
    }, [])


    return (
        <PriceChartContainer>
            <ReactApexChart options={chartState.options} series={chartState.series} type="area" width='100%' height={320} />
        </PriceChartContainer>
    )
}

export default PriceChart;
