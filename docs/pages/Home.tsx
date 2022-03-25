import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from '../../src'
import Pie from '../../src/Pie'
import { mock } from '../utils/mock'

export default function Home() {
  return (
    <>
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: 30, marginTop: 30 }}>Zen</h1>
        <h2 style={{ fontSize: 20 }}>
          An Open Source 3D Charting Library for React
        </h2>

        <Link
          to='docs'
          style={{
            display: 'block',
            margin: 'auto',
            width: 200,
            height: 50,
            fontSize: 16,
            borderRadius: 30,
            border: '1px solid #4caf50',
            backgroundColor: '#4caf50',
            color: 'white',
            marginTop: 50,
            textDecoration: 'none',
            lineHeight: 3.2
          }}
        >
          Get Started
        </Link>

        <Link
          to='examples'
          style={{
            display: 'block',
            margin: 'auto',
            width: 200,
            height: 50,
            fontSize: 16,
            borderRadius: 30,
            backgroundColor: 'white',
            border: '1px solid #4caf50',
            color: '#4caf50',
            marginTop: 20,
            textDecoration: 'none',
            lineHeight: 3.2
          }}
        >
          Examples
        </Link>
        <div
          style={{
            display: 'flex',
            margin: 20,
            justifyContent: 'center'
          }}
        >
          <Bar
            data={mock(52, 7)}
            size={350}
            xLabels={[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]}
            zLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          />
        </div>
      </div>
    </>
  )
}
