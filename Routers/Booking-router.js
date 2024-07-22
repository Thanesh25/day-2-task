import express from 'express'
import { bookedRoom, bookRoom, createRoom, getAllRoom, getCustomer } from '../controllers/Booking-controller.js'

const router = express.Router()

router.post('/createRoom', createRoom)
router.get('/getRoom', getAllRoom)
router.post('/bookingRoom', bookRoom)
router.get('/getbookedRoom', bookedRoom)
router.get('/getcustomerDetails',getCustomer)

export default router;
  

