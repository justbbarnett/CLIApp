var mysql = require("mysql");
var connection = require("./bamazonDBconnect")
var inquirer = require("inquirer");
var colors = require('colors');

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayCatalog();
});

function displayCatalog() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\t ID#: ".red.underline + res[i].id +
            "   || Product: ".red.underline + res[i].product_name +
            "   ||  Price: $".blue + res[i].price +
            "   ||  Quantity: ".blue + res[i].quantity +"\n");
        }
        
        buyItem();
    });
};

function buyItem () {
    inquirer.prompt([
        {
            name: "ID",
            message: "Enter the Product ID to being purchase:"
        },
        {
            name: "quant",
            message: "How many would you like to buy?"
        }
    ]).then( function (custInput){
        let query = connection.query ("SELECT * FROM products WHERE id=?", custInput.ID, function (err, res){
            if (err) throw err;
            if (custInput.quant > res[0].quantity) {
                console.log("Sorry we dont have enough in stock. Please revide your order.")
                buyItem();
            }
            else {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        quantity: res[0].quantity - custInput.quant
                    },
                    {
                        id: custInput.ID
                    }
                ]);
                console.log("Your total is: $" + (custInput.quant * res[0].price))
                console.log("\t ID#: ".red.underline + res[0].id +
                "   || Product: ".red.underline + res[0].product_name +
                "   ||  Price: $".blue + res[0].price +
                "   ||  Quantity: ".blue + custInput.quant +"\n");
                mainMenu();
            }
        })
    }) 
}

function mainMenu() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do next?",
            choices: [
                "Buy something else",
                "Exit",
            ]
        }
    ]).then( function(input){
    switch (input.action) {
        case "Buy something else":
        buyItem();
        break;

        case "Exit":
        console.log("\n Thank you for shopping with us! \n")
        connection.end();
        break;    
        }
    })
}
