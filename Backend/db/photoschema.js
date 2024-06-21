const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://abhishekkumar15238:Abhi@cluster0.rkapvop.mongodb.net/image')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const mongoSchema=mongoose.Schema({
    image:String
})
const imageSchema=new mongoose.model('uploaded_pic',mongoSchema);
module.exports={imageSchema};
