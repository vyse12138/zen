import { Link, Outlet } from 'react-router-dom'

export default function Docs() {
  return (
    <div style={{ display: 'flex' }}>
      <aside
        style={{
          position: 'sticky',
          width: 200,
          display: 'flex',
          flexDirection: 'column',
          padding: 15,
          boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
          zIndex: 1
        }}
      >
        <Link
          style={{
            position: 'sticky',
            top: 65,
            fontSize: 16,
            textDecoration: 'none',
            color: 'black'
          }}
          to=''
        >
          Getting Started
        </Link>
        <Link
          style={{
            position: 'sticky',
            top: 102,
            fontSize: 16,
            textDecoration: 'none',
            color: 'black'
          }}
          to='bar'
        >
          Bar
        </Link>
        <Link
          style={{
            position: 'sticky',
            top: 139,
            fontSize: 16,
            textDecoration: 'none',
            color: 'black'
          }}
          to='pie'
        >
          Pie
        </Link>
      </aside>
      <div
        style={{
          backgroundColor: '#f8f4fc',
          width: '100%',
          minHeight: '100vh',
          padding: 15
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
