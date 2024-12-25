import { User } from "~~/server/models/user-model";
import multer from 'multer';
import { callNodeListener } from 'h3';

const dir = '/var/www/vrv/www/public/cv'
//const dir = '/Users/viktorkusnir/apps/vrv/public/cv'


let originalFileName = '';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cbd) => {
    originalFileName = file.originalname;
    cbd(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('file.mimetype ', file.mimetype)
    cb(null, true);
    // if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
    //   cb(null, true);
    // } else {
    //   cb(new Error('Invalid file type'));
    // }
  },
});

export default defineEventHandler( async (event) => {
    
    try {
        await callNodeListener(upload.single('file'), event.node.req, event.node.res);
        const path = `/public/cv/${originalFileName}`;
        return path;
      } catch (error) {
        console.log(error);
        return createError({
          statusCode: 500,
          statusMessage: 'Something went wrong.',
        });
      }

  })