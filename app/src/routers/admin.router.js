import express from "express"
import { index } from "../controllers/admin.controller.js"

const router = express.Router()

router.route('/').get(index)

export default router