function bamazonCustomer () {

var mysql = require("mysql");
var connection = require("./bamazonDBconnect")
var menu = require("./bamazon")
var inquirer = require("inquirer");
var colors = require('colors');


connection.connect(function(err) {
    if (err) throw err;
    customerMenu();
});

function customerMenu() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products",
                "Buy something",
                "Back to User Menu",
                "Exit"
            ]
        }
    ]).then (function (action) {
        switch (action.action){
            case "View Products":
                displayCatalog();
            break;

            case "Buy something":
                buyItem();
            break;

            case "Back to User Menu":
                menu.bamazonMenu(); 
                connection.end(); 
            break;

            case "Exit":
                console.log("\n ******************** Thank you for working so hard! ********************\n")
                connection.end();
            break;
        }
    })
}

function displayCatalog() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\t ID#: ".red.underline + res[i].id +
            "   || Product: ".red.underline + res[i].product_name +
            "   ||  Price: $".blue + res[i].price +
            "   ||  Quantity: ".blue + res[i].quantity +"\n");
        }
        
        customerMenu();
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
            if ( !res.length) {
                console.log("Sorry! I didn't recognize that ID number. Please try again.\n")
                buyItem();
            }
            else if (custInput.quant > res[0].quantity) {
                console.log("Sorry we dont have enough in stock. Please revise your order.\n")
                buyItem();
            }
            else {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        quantity: res[0].quantity - custInput.quant,
                        product_sales: res[0].product_sales + 
                            (custInput.quant * res[0].price)
                    },
                    {
                        id: custInput.ID
                    }
                ]);
                console.log("Your total is: $" + (custInput.quant * res[0].price))
                console.log("\t ID#: ".red.underline + res[0].id +
                "   || Product: ".red.underline + res[0].product_name +
                "   ||   EA Price: $".blue + res[0].price +
                "   ||  Quantity: ".blue + custInput.quant +"\n");
            customerMenu();
            }
        })
    }) 
}

// function mainMenu() {
//     inquirer.prompt([
//         {
//             name: "action",
//             type: "list",
//             message: "What would you like to do next?",
//             choices: [
//                 "Buy something else",
//                 "Exit",
//             ]
//         }
//     ]).then( function(input){
//     switch (input.action) {
//         case "Buy something else":
//         buyItem();
//         break;

//         case "Exit":
//         console.log("\n Thank you for shopping with us! \n")
//         connection.end();
//         break;    
//         }
//     })
// }
}

module.exports.bamazonCustomer = bamazonCustomer;

