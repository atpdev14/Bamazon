// ============================================
// 			BAMAZON CUSTOMER
// ============================================

var allProductOptions = [];
var inq = require("inquirer");
var mysql = require("mysql");
var subtotalGlobal = 0;
var totalGlobal = 0;
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
  	console.log("You are connected!");
  	console.log(console.table(results));
  	selectProduct();
  })
};
// ============================================



// ============================================
// 				Select Product
// ============================================
function selectProduct(){
	//read database and list all products
	//take an input from customer asking for id number for "Done shopping"
	//prompt customer to ask how many they want
	//when done, calculate total

	inq.prompt([
		{
			type: "input",
			message: "Enter the ID of the item you'd like to purchase.",
			name: "itemSelection"
		},
		{
			type: "input",
			message: "How many would you like to buy?",
			name: "quantitySelection"
		}
		]).then(function(response){
			var itemSelection = response.itemSelection;
			var quantitySelection = response.quantitySelection;
			checkQuantity(itemSelection, quantitySelection)
		});
};
// ============================================



// ============================================
// 				Check Quantity
// ============================================
function checkQuantity(item, userQuantity){
	//find quantity of item in database and compare with userQuantity
	//log response and deduct from database
	//find subtotal
	var stockQuantity = 0;
	connection.query("SELECT * FROM products WHERE item_id= ?", item, function(err, allProductsResp){
		stockQuantity = allProductsResp[0].stock_quantity;

		//Check to see if there is enough to sell
		if(stockQuantity >= userQuantity){
			var newQuantity = stockQuantity - userQuantity;
			console.log("We have enough in stock!");

			//Update stock quantity value
			connection.query("UPDATE products SET stock_quantity= ? WHERE item_id=?", [newQuantity, item], function(err, newQuantityResp){

				//Calculate subtotal
				subtotal(item, userQuantity);
			});

		}else{
			console.log("Not enough in stock.");
		}
	});
};
// ============================================


// ============================================
// 					Subtotal
// ============================================
function subtotal(itemId, quantity){
	
	connection.query("SELECT * FROM products WHERE item_id= ?", itemId, function(err, response){
		var unitPrice = response[0].price;
		var subtotal = unitPrice * quantity;
		subtotalGlobal = subtotal;
		totalGlobal = totalGlobal + subtotal;

		console.log("Subtotal from this item: " + subtotalGlobal);

		keepShopping();
	});
};
// ============================================



// ============================================
// 				Keep Shopping
// ============================================
function keepShopping(){

	inq.prompt([
		{
			type: "list",
			message: "Keep Shopping?",
			choices: ["Yes", "No"],
			name: "keepShoppingAnswer"
		},
		]).then(function(response){
			var keepShoppingAnswer = response.keepShoppingAnswer;

			if(keepShoppingAnswer === "Yes"){
				selectProduct();
			}else {
				console.log("Total: " + totalGlobal);
			}
		});
};
// ============================================ 












