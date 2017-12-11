
// TODO: rename this function to convertOrderToDOMElement
function drawOrder(orderInfo) {
  var item = $('<li>');
  var coffee = $('<p>', {
    text: orderInfo.coffee
  });
  var email = $('<p>', {
    text: orderInfo.emailAddress
  });

  item.append(email);
  item.append(coffee);
  return item;
}

function drawAllOrders(ordersObject) {
  console.log('drawing orders!');
  console.log(ordersObject);

  // var ordersArray = Object.keys(ordersObject).map(function (k) {
  //   return ordersObject[k];
  // });

  var ordersArray = Object.values(ordersObject);

  // Version #1 with .map
  $(SELECTORS.LIST).append(ordersArray.map(drawOrder));

  // Version #2 with .forEach
  // var theOrders = [];
  // ordersArray.forEach(function (order) {
  //   var theOrderAsDOMElement = drawOrder(order);
  //   theOrders.push(theOrderAsDOMElement);
  // });
  // $(SELECTORS.LIST).append(theOrders);
}

function eraseOrders() {
  console.log('erasing orders...');
  $(SELECTORS.LIST).empty();
}

function getAllCoffeeOrders(whatToDoFn) {
  $.get(SERVER_URL, whatToDoFn);
}



function main() {
  setInterval(function () {
    eraseOrders();
    getAllCoffeeOrders(drawAllOrders);
  }, 2000)
}

main();

