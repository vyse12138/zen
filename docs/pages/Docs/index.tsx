import { Link, Outlet } from 'react-router-dom'

export default function Docs() {
  return (
    <div style={{ display: 'flex' }}>
      <aside
        style={{
          width: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          padding: 15,
          boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
          zIndex: 1
        }}
      >
        <Link
          style={{
            fontSize: 16,
            textDecoration: 'none'
          }}
          to='/docs'
        >
          Getting Started
        </Link>
        <Link
          style={{
            fontSize: 16,
            textDecoration: 'none'
          }}
          to='/docs/bar'
        >
          Bar
        </Link>
        <Link
          style={{
            fontSize: 16,
            textDecoration: 'none'
          }}
          to='/docs/pie'
        >
          Pie
        </Link>
      </aside>
      <div
        style={{
          backgroundColor: '#f8f4fc',
          width: '100%',
          height: '100vh',
          padding: 15
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
