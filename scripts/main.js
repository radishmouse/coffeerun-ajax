
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

function getSingleCoffeeOrder(email) {
  return $.get(`${SERVER_URL}${email}`);
}

function drawAllOrders(ordersObject) {
  console.log('drawing orders!');
  console.log(ordersObject);

  // var ordersArray = Object.keys(ordersObject).map(function (k) {
  //   var order = ordersObject[k];
  //   order[k] = k;
  //   return order
  // });
  // $(SELECTORS.LIST).append(ordersArray.map(drawOrder));

  var emails = Object.keys(ordersObject);
  Promise.all(emails.map(getSingleCoffeeOrder))
    .then(function (arrayOfPromises) {
      $(SELECTORS.LIST).append(arrayOfPromises.map(drawOrder));
    })
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

