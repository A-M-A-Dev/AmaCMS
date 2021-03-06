import express from "express"
import { index, create, store, deleteUser, edit, update } from "../../controllers/admin/user.controller.js"

const router = express.Router()

router.route('/').get(index)
router.route('/create').get(create)
router.route('/create').post(store)
router.route('/delete/:id').get(deleteUser)
router.route('/edit/:id').get(edit)
router.route('/edit/:id').post(update)

export default router