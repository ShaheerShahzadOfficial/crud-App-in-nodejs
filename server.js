import express from "express";
import Product from "./productModal.js";
import DBConnection from "./dbConfig.js";
import { config } from 'dotenv';


const app = express();

app.use(express.json())


DBConnection()


config({path:"config/config.env"});


app.get("/", (req, res) => {
    res.send({ message: "Hello World! by Shaheer Shahzad" });
});

app.get("/products", async (req, res) => {
    await Product.find().then((result) => {
        res.send({
            message: `All Products`,
            product: result,
        });
    }).catch((error) => {
        res.status(400).send({
            error
        });
    })

});



app.get("/product/:id", async (req, res) => {
    const id = req.params.id
    await Product.findById(id).then((result) => {
        res.send({
            message: `All Products`,
            product: result,
        });
    }).catch((error) => {
        res.status(400).send({
            error
        });
    })

});




app.post("/product", async (req, res) => {
    const { name, price, description, category } = req.body

    await Product.create({
        name,
        price,
        description,
        category
    }).then((result) => {
        res
            .status(201)
            .json({ msg: 'Product Has Been Added Successfully', product: result })
    }).catch((err) => {
        res.status(500).json({ err })
    })
})

app.put("/product/:id", async (req, res) => {
    const id = req.params.id
      
    const { name, price, description, category } = req.body

    await Product.findByIdAndUpdate(id, { name, price, description, category }).then((result) => {
        res.status(200).json({
            success: true,
            msg: "Product Has Been Updated",
        })
    }).catch((error) => {
        res.status(500).json({
            success: false,
            error,
        })  

    }
    );

})



app.delete("/product/:id", async (req, res) => {
    const id = req.params.id
    await Product.findByIdAndDelete(id).then((result) => {
        res.status(200).json({
            success: true,
            msg: "Product Has Been Deleted",
        })
        console.log("Deleted : ")
    }).catch((error) => {
        res.status(500).json({
            success: false,
            error,
        })
    });

});


const port = process.env.PORT || 3000; //Development mein 3000 available hota hein => Environment var ka number

app.listen(port, () => {
    // Port => In and out way
    console.log(`Example app listening on http://localhost:${port}/`);
});