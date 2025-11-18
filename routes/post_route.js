import express from 'express'
import { getPost, getPosts } from '../controllers/post_controller.js'


const router = express.Router();

router.get("/get_posts", getPosts)
router.get("/get_post",getPost )


export default router