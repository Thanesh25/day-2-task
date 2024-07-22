import express from 'express'
import cors from 'cors'
import roomRouter from './Routers/Booking-router.js'
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 4000


app.use('/api/room',roomRouter)

app.listen(PORT, (req,res) => {
    console.log(`server is working ${PORT}`);
})
