import express from 'express'
import cors from 'cors'
const app = express()

let posts = []

app.use(express.json())
app.use(cors({origin: '*'}))

app.get('/get/', (req, res) => {
    res.json(posts)
})

app.post('/send/', (req, res) => {
    console.log(req.body);
})

app.listen(3001, () => {console.log("Listening on port localhost:3001");})