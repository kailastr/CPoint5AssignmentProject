const express = require('express');
const dotenv = require('dotenv');

const DBConnection = require("./DB.Connection");

const ItemModel = require('./GroceryItemModel');

dotenv.config();

const app = express();

app.use(express.json());

DBConnection();

/**
 * Route:       '/items'
 * Method:      GET
 * Description: Get all items in the grocery
 * Access:      Public
 * Params:      none
 */
app.get('/', async (req, res) => {
    try {

        const allItems = await ItemModel.find({});

        return res.status(200).json({
            message: " Items got successfully",
            data: allItems
        });

    } catch (error) {

        console.log(`The error is : ${error}`);

        return res.status(500).json({
            message: "Something went wrong.. Please try again later !!"
        });
    }
});

/**
 * Route:       '/items'
 * Method:      POST
 * Description: add new items to the grocery
 * Access:      Public
 * Params:      none
 */
app.post('/items', async (req, res) => {

    try {

        const { data } = req.body;

        if (!data) {
            return res.status(404).json({
                message: "Items not found !!"
            })
        }

        const newItems = await ItemModel.create(data);

        return res.status(200).json({
            message: "Items added succesfully",
            data: newItems
        });

    } catch (error) {

        console.log(`Error is : ${error}`);

        return res.status(500).json({
            message: "Failed to add itam.. Try again later !!"
        });
    }
});

const port = 2255;
//http://localhost:2255

app.listen(port, () => {
    console.log(`The server is running in the port ${port}`);
});