class createOrder{
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

//HashMap to store the Order Objects
var orderMap = new Map();

function createUserOrder() {
    //location.href = '/confirm.html';

    /*
    console.log(document.getElementById("Name").value)
    console.log(document.getElementById("Type").value)
    console.log(document.getElementById("Reg").value)
    console.log(document.getElementById("Email").value)
    console.log(document.getElementById("Phone Number").value)
    console.log(document.getElementById("Start Date").value)
    console.log(document.getElementById("Start Time").value)
    console.log(document.getElementById("Duration").value)
    */

    userName = document.getElementById("Name").value
    spaceType = document.getElementById("Type").value
    userCar = document.getElementById("Reg").value
    userEmail = document.getElementById("Email").value
    userNumber = document.getElementById("Phone Number").value
    orderStartDate = document.getElementById("Start Date").value
    orderStartTime = document.getElementById("Start Time").value
    orderDuration = document.getElementById("Duration").value

    orderID = Math.random() * (10000000 - 1) + 1
    

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
}

function showOrders(key){
    console.log(orderMap.get(key))
}