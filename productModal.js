import mongoose from "mongoose";

const productModel = mongoose.Schema({
    name:{
        type:String,
        require:[true,"Product Name is Required"]
    },
    price:{
        type:Number,
        require:[true,"Product Price is Required"]
    },
    description:{
        type:String,
        require:[true,"Product Description is Required"]
    },
    category:{
        type:String,
        require:[true,"Product Category is Required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
      }
})


const Product = mongoose.model('Products', productModel)

export default Product
