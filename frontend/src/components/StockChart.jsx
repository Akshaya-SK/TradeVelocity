import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import 'chartjs-chart-financial'
import 'chartjs-adapter-date-fns' // ✅ important for time scale

Chart.register(...registerables)

export default function StockChart({ symbol, priceStream = [] }) {
  const canvasRef = useRef()

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')

    // Transform priceStream into {x: date, y: price} objects
    const chartData = priceStream.map(p => ({
      x: new Date(p.ts), // ensure proper Date object
      y: p.price
    }))

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: `${symbol} price`,
            data: chartData,
            tension: 0.2,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: {
            type: 'time',      // ✅ time scale
            time: { unit: 'minute' } // adjust as needed
          },
          y: { beginAtZero: false }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
      }
    })

    return () => chart.destroy()
  }, [symbol, priceStream])

  return <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} />
}
