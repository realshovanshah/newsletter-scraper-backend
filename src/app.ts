import express from "express"
import { weeklyRouter } from './routes/weekly-newsletter'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
const port = 3000

app.use('/weekly-newsletter', weeklyRouter)
app.use(express.json())

mongoose.connect(process.env.DB_URL as string, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
    console.log('connected to the mongo database')
).catch((err) => console.log(err))


app.get('/', async (req, res) => {
    console.log(`Received! from: ${req.ip}`)
    res.send("<h2>Not a valid route!.</h2><p>These are the endpoints we expose:<p><p>/api/weekly-newsletter</p></h2><p>/api/daily-newsletter</p>")
})


app.listen(port, () => console.log(`App listening on port ${port}!`))