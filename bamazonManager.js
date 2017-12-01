// ============================================
// 			BAMAZON MANAGER
// ============================================
 // * View Products for Sale
 //    * View Low Inventory
 //    * Add to Inventory
 //    * Add New Product

var inq = require("inquirer");
var mysql = require("mysql");
require("console.table");



// ============================================
// 				CONNECT
// ============================================ 
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (!err){
    startApp();
  };
  
});
// ============================================



// ============================================
// 				Start App
// ============================================
function startApp() {
  connection.query("SELECT * FROM products", function(err, results){
  	mainMenu();
  })
};
// ============================================



// ============================================
// 				Main Menu
// ============================================
function mainMenu(){

	inq.prompt([
		{
			type: "list",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
			message: "What would you like to do?",
			name: "menuSelection"
		}
		]).then(function(response){
			var menuSelection = response.menuSelection;

			switch (menuSelection){
				case "View Products for Sale":
					viewProducts();
					break;

				case "View Low Inventory":
					viewLowInventory();
					break;

				case "Add to Inventory":
					orderInventory();
					break;

				case "Add New Product":
					addProduct();
					break;
			}
			
		});
};
// ============================================



// ============================================
// 				View Products
// ============================================
function viewProducts() {
	connection.query("SELECT * FROM products", function(err, viewProductsResp){
		console.log(console.table(viewProductsResp));
		console.log("\n");
		setTimeout(exit, 2000);
	});
};
// ============================================


// ============================================
// 				View Low Inventory
// ============================================
function viewLowInventory() {
	console.log("\n");
	connection.query("SELECT * FROM products WHERE stock_quantity < 20", function(err, viewLowResp){
		console.log("Products with less than 20 units.");
		console.log(console.table(viewLowResp));
		console.log("\n");
		setTimeout(exit, 2000);
	});
};
// ============================================



// ============================================
// 				Add to Inventory
// ============================================
function orderInventory(){

	inq.prompt([
		{
			type: "input",
			message: "Enter item ID to order.",
			name: "orderSelection"
		},
		{
			type: "input",
			message: "How many units would you like to order?",
			name: "orderQuantity"
		}
		]).then(function(response){
			var orderSelection = response.orderSelection;
			var orderQuantity = response.orderQuantity;

			connection.query("UPDATE products SET stock_quantity= stock_quantity + ? WHERE item_id = ?", [orderSelection, orderQuantity], function(err, orderInvResp){ 
				console.log(orderQuantity + " units added to inventory.");
				setTimeout(exit, 2000);
	});
			
		});
};

// ============================================ 



// ============================================
// 				Add New Product
// ============================================
function addProduct(){
	inq.prompt([
		{
			type: "input",
			message: "What would you like to order?",
			name: "newItem"
		},
		{
			type: "input",
			message: "What department is it for?",
			name: "department"
		},
		{
			type: "input",
			message: "What is the retail price?",
			name: "retailPrice"
		},
		{
			type: "input",
			message: "How many would you like to order?",
			name: "orderQuantity"
		},
		]).then(function(response){
			var newItem = response.newItem;
			var department = response.department;
			var retailPrice = response.retailPrice;
			var orderQuantity = response.orderQuantity;

			connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?,?,?,?)", [ newItem, department, retailPrice, orderQuantity],function(err, orderInvResp){ 
				console.log("Item ordered.");
				setTimeout(exit, 2000);
			});
			
		});
};
// ============================================ 


// ============================================
// 				Exit to Main Menu
// ============================================
function exit(){
	console.log("\n");

	inq.prompt([
		{
			type: "confirm",
			message: "Exit to main menu: ",
			name: "exitSelection"
		}
		]).then(function(response){
			var exitSelection = response.exitSelection;

			switch (exitSelection){

				case true:
					console.log("\n");
					mainMenu();
					break;

				case false:
					console.log("\n");
					exit();
					break;
			}
			
		});
};
// ============================================












