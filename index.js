const express = require('express')
const {query} = require('./mongodb.js')

const app = express()
const PORT = process.env.PORT || 3000

class Merchant {
    constructor(name, imageUrl, category, offers) {
        this.name = name
        this.imageUrl = imageUrl
        this.category = category
        this.offers = offers
    }
}

const listOfMerchants = [
    new Merchant("Swiggy", "data:image/png;base64,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",
        "food", ["20%off-Above 200", "10%off-Above 100"]),
    new Merchant("Domino's", "data:image/jpeg;base64,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",
        "food", ["20%off-Above 400", "10%off-Above 200"]),
]


function getDataForCategory(category, resultCallback) {
    return query(category, resultCallback)
    // return listOfMerchants.filter(merchant =>
    //     merchant.category === category
    // )
}

app.get("/category", (req, res) => {
    const category = req.query.category
    if (category) {
         getDataForCategory(category,(merchants) => {
             const responseData = {
                 success: true,
                 stores: merchants
             }
            res.status(200).json(responseData)
        })
        // console.log(listOfMerchants)
        return
    }
    res.status(404).send("Category not found")
})

app.get("*", (req, res) => {
    res.status(200).send("Idhar kuch nhi milega")
})


app.listen(PORT, () => console.log("server running at port number " + PORT))