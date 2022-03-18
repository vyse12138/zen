import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as zen from '../../packages/zen'
import { mock } from '../data/mock'

function App() {
  const [count, setCount] = useState(0)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvas.current) return

    zen.create(canvas.current, {
      data: mock(7, 52)
    })
  }, [])
  return (
    <div className='App'>
      <canvas id='canvas' ref={canvas}></canvas>
    </div>
  )
}

export default App
