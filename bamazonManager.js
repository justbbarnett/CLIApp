var mysql = require("mysql");
var connection = require("./bamazonDBconnect")
var inquirer = require("inquirer");
var colors = require('colors');

connection.connect(function (err) {
    if (err) throw err;
    console.log("\033c");
    managerMenu();
});

function managerMenu () {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do next?",
            choices: [
                "View Products",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ]).then (function (action) {
        switch (action.action){
            case "View Products":
                displayCatalog();
            break;

            case "View Low Inventory":
                lowProducts();
            break;

            case "Add to Inventory":
                addInventory();
            break;

            case "Add New Product":
                addProduct();
            break;

            case "Exit":
            console.log("\n ******************** Thank you for working so hard! ********************\n")
            connection.end();
            break;
        }
    })
};

function displayCatalog() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\t ID#: ".red.underline + res[i].id +
            "   || Product: ".red.underline + res[i].product_name +
            "   ||  Price: $".blue + res[i].price +
            "   ||  Quantity: ".blue + res[i].quantity +"\n");
        }
        managerMenu();
    });
};

function lowProducts(){
    connection.query("SELECT * FROM products WHERE quantity <?", 50, function(err, res) {
        if (!res.length){
            console.log("-------------- All products are stocked! --------------")
        }
        for (var i = 0; i < res.length; i++) {
            console.log("\t ID#: ".red.underline + res[i].id +
            "   || Product: ".red.underline + res[i].product_name +
            "   ||  Price: $".blue + res[i].price +
            "   ||  Quantity: ".blue + res[i].quantity +"\n");
        }
        managerMenu();
    });
};

function addInventory (){
    inquirer.prompt([
        {
            name: "ID",
            message: "Enter the Product ID to add inventory to:"
        },
        {
            name: "quant",
            message: "How many would you like to add?"
        }
    ]).then( function (input){
        connection.query ("SELECT * FROM products WHERE id=?", input.ID, function (err, res){
            if (res == undefined) {
                console.log("Product ID not found. Please try again.")
                addInventory();
            }
            else {
                let sum = parseInt(res[0].quantity) + parseInt(input.quant)
                console.log ("New Quantity: " + sum)
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        quantity: sum
                    },
                    {
                        id: input.ID
                    }
                ]);
                console.log("\t ID#: ".red.underline + res[0].id +
                "   || Product: ".red.underline + res[0].product_name +
                "   ||  Price: $".blue + res[0].price +
                "   ||  Quantity: ".blue + sum  +"\n");
                managerMenu();
            }
        })
    }) 
};

function addProduct (){

};
