import { Bar } from 'zenjs-react'
import Pie from '../../packages/zenjs-react/src/charts/Pie3D'
import { mock } from '../utils/mock'
import { Link } from 'react-router-dom'
import bar1 from '../assets/examples/bar1.jpg'
import bar2 from '../assets/examples/bar2.jpg'
import pie1 from '../assets/examples/pie1.jpg'
import bg1 from '../assets/backgrounds/3d1.jpg'
import bg2 from '../assets/backgrounds/3d2.jpg'
import bg3 from '../assets/backgrounds/3d3.jpg'
import bg4 from '../assets/backgrounds/3d4.jpg'
import bg5 from '../assets/backgrounds/3d5.jpg'
import bg6 from '../assets/backgrounds/3d6.jpg'
import { useState } from 'react'

export default function Examples() {
  const [example, setExample] = useState(1)
  const [background, setBackground] = useState('')
  const [size, setSize] = useState(window.innerHeight - 80)
  const width = window.innerWidth
  window.scrollTo(0, 0)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#f8f4fc'
        }}
      >
        {/* example */}
        <aside
          style={{
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            padding: 15,
            paddingTop: 0,
            boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
            zIndex: 1,
            backgroundColor: 'white',
            textAlign: 'center'
          }}
        >
          <p style={{ marginBottom: 0 }}>例子</p>
          <img
            src={bar1}
            onClick={() => {
              setExample(1)
              setBackground('')
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          <img
            src={bar2}
            onClick={() => {
              setExample(2)
              setBackground('')
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          {/* <img
            src={pie1}
            onClick={() => {
              setExample(3)
              setBackground('')
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          /> */}
        </aside>

        {/* canvas */}
        <div
          style={{
            padding: 15,
            position: 'fixed',
            transform: `translateX(50%)`
          }}
        >
          {example === 1 && (
            <Bar
              data={mock(52, 7)}
              size={size}
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
              transparent={true}
              background={background}
            />
          )}

          {example === 2 && (
            <Bar
              data={[
                [98, 77, 101, 99, 40],
                [150, 182, 201, 154, 190],
                [220, 232, 191, 234, 290],
                [320, 332, 301, 334, 390]
              ]}
              size={size}
              xLabels={['2012', '2013', '2014', '2015', '2016']}
              zLabels={['Forest', 'Steppe', 'Desert', 'Wetland']}
              colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
              transparent={true}
              background={background}
            />
          )}

          {/* {example === 3 && (
            <Pie
              data={[
                [111, 333, 241, 444, 542],
                [424, 182, 67, 291],
                [352, 111, 222],
                [853, 156, 333, 555]
              ]}
              xLabels={[
                [
                  'iPhone 11',
                  'iPhone 12',
                  'iPhone 12 Pro',
                  'iPhone 13',
                  'iPhone 14'
                ],
                ['S11', 'S11 Ultra', 'Note 21', 'S12 FE'],
                ['Xiaomi 11', 'Xiaomi 12', 'Xiaomi 10s'],
                ['Mate 40 Pro', 'P30', 'P40', 'Mate 40']
              ]}
              zLabels={['苹果', '三星', '小米', '华为']}
              colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
              size={size}
              baseHeight={13}
              background={background}
            />
          )} */}
        </div>

        {/* background */}
        <aside
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            padding: 15,
            paddingTop: 0,
            boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
            zIndex: 1,
            backgroundColor: 'white',
            textAlign: 'center'
          }}
        >
          <p style={{ marginBottom: 0 }}>背景</p>

          <img
            src={bg1}
            onClick={() => {
              setBackground(bg1)
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          <img
            src={bg2}
            onClick={() => {
              setBackground(bg2)
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          <img
            src={bg3}
            onClick={() => {
              setBackground(bg3)
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          <img
            src={bg4}
            onClick={() => {
              setBackground(bg4)
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          <img
            src={bg5}
            onClick={() => {
              setBackground(bg5)
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
          <img
            src={bg6}
            onClick={() => {
              setBackground(bg6)
            }}
            style={{
              height: 200,
              boxShadow: 'rgb(0 0 0 / 20%) -1px -2px 10px',
              cursor: 'pointer'
            }}
          />
        </aside>
      </div>
    </>
  )
}
