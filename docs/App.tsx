import { useEffect, useRef, useState } from 'react'
import { Bar } from '../src'
import { mock } from './utils/mock'
import './App.css'

function App() {
  return (
    <div>
      <Bar
        data={mock(52, 7)}
        size={500}
        xLabel={[
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
        zLabel={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      />
    </div>
  )
}

export default App
