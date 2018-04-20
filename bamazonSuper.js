function bamazonSuper () {

var mysql = require("mysql");
var connection = require("./bamazonDBconnect")
var menu = require("./bamazon")
var inquirer = require("inquirer");
var colors = require('colors');

console.log ("Hello Supervisor!")

connection.connect(function (err) {
    if (err) throw err;
    console.log("\033c");
    superMenu();
});

function superMenu () {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do next?",
            choices: [
                "View Product Sales Department",
                "Create New Department",
                "Back to User Menu",
                "Exit"
            ]
        }
    ]).then (function (action) {
        switch (action.action){
            case "View Product Sales Department":
                viewPSD();
            break;

            case "Create New Department":
                createNewDept();
            break;

            case "Back to User Menu":
                
                menu.bamazonMenu();
            break;

            case "Exit":
            console.log("\n ******************** Thank you for keeping us organized and profitable! ********************\n")
            connection.end();
            break;
        }
    })
}
}

module.exports.bamazonSuper = bamazonSuper;