import { Link } from 'react-router-dom'
import logo from '../assets/zen.png'
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
          backgroundColor: 'white'
        }}
      >
        <Link
          style={{
            height: 50,
            padding: 10,
            fontSize: 16,
            textDecoration: 'none'
          }}
          to='/'
        >
          <img src={logo} height='30'></img>
        </Link>
        <Link
          style={{
            height: 50,
            padding: 15,
            fontSize: 16,
            textDecoration: 'none'
          }}
          to='/docs'
        >
          Docs
        </Link>
        <Link
          style={{
            height: 50,
            padding: 15,
            fontSize: 16,
            textDecoration: 'none'
          }}
          to='/examples'
        >
          Examples
        </Link>
      </div>
    </>
  )
}
