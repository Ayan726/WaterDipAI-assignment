import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import useStore from '../store/store'
import { monthMap } from '../utils/utils'

const Sparkline = ({ visitor }) => {
    const [seriesData, setSeriesData] = useState([])
    const data = useStore(store => store.data)

    const processData = () => {
        const seriesObj = {}
        data.forEach(record => {
            let recordDate = new Date(`${record.arrival_date_year.toString()}-${monthMap[record.arrival_date_month]}-${record.arrival_date_day_of_month.toString()}`)
            recordDate = new Date(recordDate).getTime()
            if (recordDate in seriesObj) {
                seriesObj[recordDate] += record[visitor]
            }
            else {
                seriesObj[recordDate] = record[visitor]
            }
        });
        let sparkData = Array.from(Object.values(seriesObj))
        // console.log(seriesObj);
        setSeriesData(sparkData)
    }

    const config = {
        series: [{
            name: visitor,
            data: seriesData,
            color: '#ff4646fc',
        }],
        options: {
            chart: {
                type: 'area',
                height: 160,
                sparkline: {
                    enabled: true
                },
            },
            stroke: {
                curve: 'straight',
                colors: ['#ff4646fc']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#ff805d',
                    colorTo: '#ff4646fc',
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.7,
                    opacityTo: 0,
                    // stops: [0, 90, 100]
                },
            },
            yaxis: {
                min: 0,
                labels: {
                    style: {
                        colors: 'white'
                    }
                }
            },
            colors: ['rgb(59, 130, 246)'],
            title: {
                text: `Number of ${visitor}`,
                offsetX: 0,
                style: {
                    fontSize: '16px',
                    color: 'white'
                }
            }
        }
    };

    useEffect(() => {
        processData()
    }, [data])

    return (
        <div>
            <Chart
                options={config.options}
                series={config.series}
                type='area'
                height={350}
            />
        </div>
    )
}

export default Sparkline
