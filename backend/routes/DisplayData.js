import express from 'express'
import useController from '../controllers/useController.js'

const router=express.Router()

router.post('/foodData',useController.DisplayData)

export default router