const Firm = require('../models/Firm');
const Product = require('../models/Product');
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Renaming file with current timestamp and original extension
    }
  });
  const upload = multer({ storage: storage });

const addProduct = async(req,res)=>{
    try {
        const {productName,price,category,bestSeller,description}=req.body;
        const image = req.file ? req.file.filename : undefined;
        
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId)
        if(!firm){
          return res.status(404).send({message:"no firm found"})
        }
        const product = new Product({
          productName,price,category,bestSeller,description,image,firm:firm._id
        })
        const savedProduct = await product.save()

        firm.product.push(savedProduct)

        await firm.save()
        res.status(202).send(savedProduct)
    } catch (err) {
        console.log(err)
        res.status(500).send({error:"addProduct error"})
    }
} 

const getProductByFirm = async(req,res)=>{
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId)
    if(!firm){
      return res.status(404).send({error:"No firm Found"})
    }
    const restaurantName = firm.firmName
    const products = await Product.find({firm:firmId})
    res.status(200).json({restaurantName,products})
  } catch (err) {
    console.log(err)
    res.status(500).send({error:"getProductByFirm error"})
  }
}
  
const deleteProductById = async(req,res)=>{
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId)
    if(!deletedProduct){
      return res.status(404).json({error:"No product found"})
    }
    return res.status(200).json({success:"successfully deleted product"})
  } catch (err) {
    console.log(err)
    return res.status(500).send({error:"deletedProductById error"})
  }
}
module.exports={addProduct: [upload.single('image'),addProduct],getProductByFirm,deleteProductById };

// module.exports = { addFirm: [upload.single('image'), addFirm] };
