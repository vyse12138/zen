import font from './font-data.json'

export default (req, res) => {
  res.status(200).json(font)
}
