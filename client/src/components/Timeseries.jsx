import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import useStore from '../store/store'
import { monthMap } from '../utils/utils'

const Timeseries = () => {
  const data = useStore(store => store.data)
  const [seriesData, setSeriesData] = useState()

  const processData = () => {
    const seriesObj = {}
    data.forEach(record => {
      let recordDate = new Date(`${record.arrival_date_year.toString()}-${monthMap[record.arrival_date_month]}-${record.arrival_date_day_of_month.toString()}`)
      recordDate = new Date(recordDate).getTime()
      if (recordDate in seriesObj) {
        seriesObj[recordDate] += record.adults + record.babies + record.children
      }
      else {
        seriesObj[recordDate] = record.adults + record.babies + record.children
      }
    });
    let newSeriesData = []
    for (const rec in seriesObj) {
      newSeriesData.push({
        x: Number(rec),
        y: Number(seriesObj[rec])
      })
    }
    setSeriesData(newSeriesData)
  }


  useEffect(() => {
    processData()
  }, [data])

  const config = {
    series: [{
      name: 'visitors',
      data: seriesData,
      color: '#ff4646fc'
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      stroke: {
        colors: ['#ff4646fc']
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        colors: ['#ff4646fc', '#ff805d']
      },
      title: {
        text: 'Daily Bookings',
        offsetY: 0,
        align: 'left',
        style: {
          fontSize: '16px',
          color: 'white'
        }
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
        },
      },
      yaxis: {
        title: {
          text: 'Booking',
          style: {
            color: 'white'
          }
        },
        labels: {
          style: {
            colors: 'white'
          }
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: 'white'
          }
        }
      },
      tooltip: {
        shared: false,
      }
    },
  }

  return (
    <div>
      {
        seriesData &&
        <Chart
          options={config.options}
          series={config.series}
          type="area"
          height={350}
        />
      }
    </div>
  )
}

export default Timeseries
