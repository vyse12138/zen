import { useEffect, useRef, useState } from 'react'
import GettingStarted from '../docs/pages/Docs/src/GettingStarted'
import Bar from '../docs/pages/Docs/src/Bar'
import Pie from '../docs/pages/Docs/src/Pie'
import { mock } from './utils/mock'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import Docs from './pages/Docs'
import Examples from './pages/Examples'

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/docs' element={<Docs />}>
          <Route path='/docs' element={<GettingStarted />} />
          <Route path='/docs/bar' element={<Bar />} />
          <Route path='/docs/pie' element={<Pie />} />
        </Route>

        <Route path='/examples' element={<Examples />} />
      </Routes>
    </div>
  )
}

export default App
