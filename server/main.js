import express from 'express'
import cors from 'cors'
const app = express()

//In-memory database
let posts = []

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({origin: '*'}))

app.get('/get/', (req, res) => {
    res.json(posts)
})

app.post('/send', (req, res) => {
    posts.push(req.body)
    res.json(posts)
})

app.listen(3001, () => {console.log("Listening on port localhost:3001");})