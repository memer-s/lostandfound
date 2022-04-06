import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [object, setObject] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    fetchData()
    setInterval(() => {
      fetchData()
    }, 2000)
  }, [])

  useEffect(() => {
    console.log("1");
    const int = setInterval(() => {
      setIndex(index => index + 1)
      if(index>object.length-2) {
        setIndex(0)
      }
    }, 2000)
    return () => clearInterval(int)
  }, [index])
  
  const fetchData = () => {
    fetch("http://localhost:3001/get").then(res => res.json()).then(res => setObject(res))
  }

  return (
    <div className="App">
      <h1>{object[index]?.description}</h1>
      <img src={object[index]?.imageData}/>
      <p>{object[index]?.location}</p>
      
    </div>
  )
}

export default App
