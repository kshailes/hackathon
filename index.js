const express = require('express')

const app = express()
const PORT = 3000

class Merchant {
       constructor(name, imageUrl, category, offers) {
           this.name = name
           this.imageUrl = imageUrl
           this.category = category
           this.offers = offers
       }
}

const listOfMerchants = [
    new Merchant("Swiggy", "imageurl", "food", "20%off"),
    new Merchant("Domino's", "imageurl", "food", "10%off"),
]

function getDataForCategory(category) {
    return listOfMerchants.filter( merchant =>
        merchant.category === category
    )
}

app.get("/category", (req,res)=> {
    const category = req.query.category
    if(category) {
        const merhcants = getDataForCategory(category)
        console.log(listOfMerchants)
        return res.status(200).json(merhcants)
    }
    res.status(404).send("not found")
})


app.listen(PORT, ()=> console.log("server running at port number "+ PORT))