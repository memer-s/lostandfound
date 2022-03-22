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
    
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    }).then(res => res.json()).then(res => console.log(res))
  }
  
  const set = (e, type) => {
    setMessage({...message, [type]: e.target.value})
  }
  const setFile = (e) => {

    const props = {}
    const img = e.target.files[0]

    if (!img) return

    //Filter out prototypes from files object
    for (let prop in img) {
      if (typeof img[prop] == "function") continue
      props[prop] = img[prop]
    }

    //Read file as 64bit string
    const reader = new FileReader()
    reader.onload = function(e) {
      const file = e.target.result
      setMessage({...message, imagePath: props, imageData: file})
    }
    reader.readAsDataURL(img)
      
  }

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" onChange={(e) => set(e, "description")} />
        <input type="text" onChange={(e) => set(e, "location")}  />
        <input type="file" onChange={setFile} />
        <input type="submit" />
      </form>
     <img src="" alt="" />
    </div>
  )
}
