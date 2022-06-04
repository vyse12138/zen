import { Link } from 'react-router-dom'
import { Bar } from 'zenjs-react'
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
        <h1 style={{ fontSize: 30, marginTop: 30 }}>Zen.js</h1>
        <h2 style={{ fontSize: 20 }}>一个迷你开源 3D 图表库</h2>

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
          开始
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
          例子
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
