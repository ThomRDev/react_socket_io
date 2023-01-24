
const getLast = async () => {
  const response = await fetch('http://localhost:3000/last')
  const data = await response.json()
  return data.last
}

export default getLast