const express = require('express');
const app = express();
const multer = require('multer');
const { imageSchema } = require('./photoschema');
const cors = require('cors');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../reactprojct/src/assets/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// Ensure you have a MongoDB connection


app.post('/api/upload', upload.single('image'), async (req, res) => {

  try {
    await imageSchema.create({
      image: req.file.originalname
    });
    res.json({ msg: "successfully uploaded" });
  } catch (err) {
    
    res.status(500).json({ msg: "error uploading file" });
  }
});
app.get('/getimage',async(req,res)=>{
   const response=await imageSchema.find({});
   if(response)
    {
      console.log('photo retrive successfully');
       res.json({imagedetail:response});
    }
    else
    res.json({});
})
app.listen(port, () => {
  console.log("listening at port=" + port);
});
