// order.mjs

const { arrayBuffer } = require("stream/consumers")


//class createOrder that creates an opject of createOrder when called 
class createOrder{

    //takes in below values when order is created
    constructor(orderID,
                userName,
                spaceType,
                userCar,
                userEmail,
                userNumber,
                orderStartDate,
                orderStartTime,
                orderDuration
                ){

        this.orderID = orderID
        this.userName = userName
        this.spaceType = spaceType
        this.userCar = userCar
        this.userEmail = userEmail
        this.userNumber = userNumber
        this.orderStartDate = orderStartDate
        this.orderStartTime = orderStartTime
        this.orderDuration = orderDuration
        }


    //toString method for createOrder class
    toString(){
        return 'Order ID: '+this.orderID+
               'User Name: '+this.userName+
               'Order Type: '+this.spaceType+
               'User Car: '+this.userCar+
               'User Email: '+this.userEmail+
               'User Number: '+this.userNumber+
               'Order Start Date: '+this.orderStartDate+
               'Order Start Time: '+this.orderStartTime+
               'Order Duration: '+this.orderDuration;
    }
}


//const Order = new createOrder(1231)

//HashMap to store the Order Objects ??? should maybe use array so its easier to show all orders? hashmap is good because its easy to get specific items
var orderMap = new Map();

//Arraylist to save the key of the hashmap funciton. Hashmap for easy access to spcefic items. arraylist to itterate through them easily
var orderArray = [];

function createUserOrder() {

    //takes in and sets the values from the table to the variables below
    userName = document.getElementById("Name").value
    spaceType = document.getElementById("Type").value
    userCar = document.getElementById("Reg").value
    userEmail = document.getElementById("Email").value
    userNumber = document.getElementById("Phone Number").value
    orderStartDate = document.getElementById("Start Date").value
    orderStartTime = document.getElementById("Start Time").value
    orderDuration = document.getElementById("Duration").value


    //generates a (sumwhat) random order id ?? not really used??
    orderID = Math.random() * (10000000 - 1) + 1
    
    //creates a new object with variables taken
    const Order = new createOrder(orderID,
                                  userName,
                                  spaceType,
                                  userCar,
                                  userEmail,
                                  userNumber,
                                  orderStartDate,
                                  orderStartTime,
                                  orderDuration);

    //console.log(Order);

    //creating a key for the object to be saved 
    key = userEmail+orderStartDate+orderStartTime+orderDuration
    console.log(key)

    //saves the order in the orderMap
    orderMap.set(key, Order)

    console.log(orderMap.get(key))

    orderArray.push(key)

    showAllOrders();
}

function showOrders(key){
    console.log(orderMap.get(key))
}

function showAllOrders(){

    //x = orderMap.size()
    
    //for (const [key, value] of Object.entries(Order)) {
      //  console.log(key, value);
      //}

    //console.log(orderMap.get(key))


    //add current orders to the confirmation page 
    console.log("test")
    document.getElementById("OrdersUpdate").innerHTML += 
    "<h3>This is an order:</h3>";
    

}


//store the objects in array or hashmap