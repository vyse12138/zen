import { useEffect, useRef, useState } from 'react'
import Bar from './components/Bar'
import { mock } from './utils/mock'
import './App.css'

function App() {
  return (
    <div>
      <Bar data={mock(52, 7)} size={500} />
    </div>
  )
}

export default App
