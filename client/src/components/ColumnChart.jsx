import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import useStore from '../store/store';

const ColumnChart = () => {
    const data = useStore(store => store.data)
    const [xdata, setXdata] = useState([])
    const [ydata, setYdata] = useState([])

    const processData = () => {
        const seriesObj = {}
        data.forEach(record => {
            if (record.country in seriesObj) {
                seriesObj[record.country] += record.adults + record.babies + record.children
            } else {
                seriesObj[record.country] = record.adults + record.babies + record.children
            }
        })
        let xAxis = []
        let yAxis = []
        for (const rec in seriesObj) {
            xAxis.push(rec)
            yAxis.push(Number(seriesObj[rec]))
        }
        setXdata(xAxis)
        setYdata(yAxis)
    }

    const config = {
        series: [{
            name: 'Visitors',
            data: ydata
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#ff4646fc', '#ff805d']
                }
            },
            fill: {
                colors: ['#ff4646fc', '#ff805d']
            },

            xaxis: {
                categories: xdata,
                position: 'bottom',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#ff4646fc',
                            colorTo: '#ff805d',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                labels: {
                    style: {
                        colors: 'white'
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }

            },
            title: {
                text: 'Number of visitors per country',
                floating: true,
                offsetY: 0,
                align: 'left',
                style: {
                    color: 'white',
                    fontSize: '16px'
                }
            }
        }
    };

    useEffect(() => {
        processData()
    }, [data])

    return (
        <div>
            {
                xdata && ydata &&
                <Chart
                    options={config.options}
                    series={config.series}
                    type="bar"
                    height={380}
                />
            }
        </div>
    )
}

export default ColumnChart
