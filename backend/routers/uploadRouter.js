import multer from 'multer';
import Path from 'path';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(Path.resolve())
    cb(null, Path.join(Path.resolve(),'/uploads'));
  },
  filename(req, file, cb) {
    // console.log(file)
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  console.log(req.file)
  res.send(`${req.file.filename}`);
});

export default uploadRouter;
