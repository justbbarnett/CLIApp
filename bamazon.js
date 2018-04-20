var inquirer = require("inquirer");
var colors = require('colors');

let cust = require("./bamazonCustomer")
let mgr = require("./bamazonManager")
let spr = require("./bamazonSuper")


function bamazonMenu () {
    console.log("\nBamazon Main Menu\n");

    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Who are you?",
            choices: [
                "Customer",
                "Manager",
                "Supervisor",
                "Exit"
            ]
        }
    ]).then (function (input) {
        
        switch (input.action){
            case "Customer":
                cust.bamazonCustomer();
            break;

            case "Manager":
                mgr.bamazonManager ();
            break;

            case "Add to Inventory":
                spr.bamazonSuper();
            break;

            case "Exit":
            console.log("\n ******************** Thank you for being loyal to B - Amazon! ********************\n")
            return;
            break;
        }
    })
};

bamazonMenu ();

module.exports.bamazonMenu = bamazonMenu;
