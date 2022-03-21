import font from 'three/examples/fonts/helvetiker_bold.typeface.json'

export default (req, res) => {
  res.status(200).json(font)
}
