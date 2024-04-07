const Firm = require("../models/Firm")
const Vendor = require("../models/Vendor")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Renaming file with current timestamp and original extension
    }
  });
  
  const upload = multer({ storage: storage });


const addFirm = async (req, res) => {
  try {
      const { firmName, area, category, region, offer } = req.body;
      const image = req.file ? req.file.filename : undefined;

      const vendor = await Vendor.findById(req.vendorId);
      if (!vendor) {
          return res.status(404).send({ message: "Vendor not found" });
      }

      const firm = new Firm({
          firmName,
          area,
          category,
          region,
          offer,
          image,
          vendor: vendor._id // Ensure vendor exists before accessing its _id property
      });

      const savedFirm = await firm.save();

      vendor.Firm.push(savedFirm)

      await vendor.save()
      
      return res.status(200).send("Firm added successfully");
  } catch (err) {
      console.log(err);
      return res.status(500).send("Error adding firm");
  }
};

const deleteFirmById = async(req,res)=>{
  try {
    const firmId = req.params.firmId;
    const deletedProduct = await Firm.findByIdAndDelete(firmId)
    if(!deletedProduct){
      return res.status(404).json({error:"No product found"})
    }
    return res.status(200).json({success:"successfully deleted product"})
  } catch (err) {
    console.log(err)
    return res.status(500).send({error:"deletedProductById error"})
  }
}

module.exports = { addFirm: [upload.single('image'), addFirm] ,deleteFirmById};
