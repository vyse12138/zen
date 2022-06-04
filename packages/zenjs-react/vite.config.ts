import path from 'path'

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'index',
      fileName: (format: string) => `index.${format}.js`
    },
    rollupOptions: {
      external: [
        'three',
        'react',
        'three/examples/fonts/helvetiker_bold.typeface.json',
        'three/examples/jsm/controls/OrbitControls',
        'three/examples/jsm/loaders/FontLoader',
        'three/examples/jsm/geometries/TextGeometry'
      ],
      output: {
        globals: {
          three: 'THREE',
          react: 'React',
          'three/examples/fonts/helvetiker_bold.typeface.json': 'Helvetica',
          'three/examples/jsm/controls/OrbitControls': 'OrbitControls',
          'three/examples/jsm/loaders/FontLoader': 'FontLoader',
          'three/examples/jsm/geometries/TextGeometry': 'TextGeometry'
        }
      }
    }
  }
}
