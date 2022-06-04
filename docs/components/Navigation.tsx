import { Link } from 'react-router-dom'
import zen from '../assets/zen.png'
import github from '../assets/github.png'

export default function Navigation() {
  return (
    <>
      <div
        style={{
          position: 'sticky',
          display: 'flex',
          top: 0,
          left: 0,
          height: 50,
          boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
          zIndex: 3,
          backgroundColor: 'white',
          fontSize: 16
        }}
      >
        <Link
          style={{
            padding: 10,
            textDecoration: 'none'
          }}
          to='/'
        >
          <img src={zen} height='30'></img>
        </Link>
        <Link
          style={{
            padding: 15,
            textDecoration: 'none',
            color: 'black'
          }}
          to='/docs'
        >
          文档
        </Link>
        <Link
          style={{
            padding: 15,
            textDecoration: 'none',
            color: 'black'
          }}
          to='/examples'
        >
          例子
        </Link>

        <a
          style={{
            padding: 12,
            textDecoration: 'none',
            flexGrow: '1',
            textAlign: 'right'
          }}
          href='https://github.com/vyse12138/zen'
          title='Source on GitHub'
          target='_blank'
          rel='noopener'
        >
          <img src={github} height='26'></img>
        </a>
      </div>
    </>
  )
}
