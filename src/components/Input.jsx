import React, {useState, useEffect} from 'react'

export default function Input() {

  const [message, setMessage] = useState({
    description: null,
    location: null,
    imagePath: null,
    imageData: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const img = message.imagePath
    const reader = new FileReader()
    reader.onload = function (e) {
      const file = e.target.result
      setMessage({...message, imageData: file})

      fetch("http://localhost:3001/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      })
    }
    reader.readAsDataURL(img)
    console.log(message)


  }

  useEffect(() => {
    console.log(message)
  }, [message])

  const set = (e, type) => {
    setMessage({...message, [type]: e.target.value})

  }
  const setFile = (e) => {
    setMessage({...message, imagePath: e.target.files[0]})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => set(e, "description")} />
        <input type="text" onChange={(e) => set(e, "location")}  />
        <input type="file" onChange={setFile} />  
        <input type="submit" />
      </form>
     <img src="" alt="" /> 
    </div>
  )
}
