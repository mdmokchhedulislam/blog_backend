import express from 'express'
import { createPost, getPost, getPosts } from '../controllers/post_controller.js'
import { upload } from '../utils/multer.js';


const router = express.Router();

router.get("/get_posts", getPosts)
router.get("/get_post",getPost )
router.post("/create", upload.single("image"), createPost);


export default router