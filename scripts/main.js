
function drawOrder(orderInfo) {
  var item = $('<li>');
  var coffee = $('<p>', {
    text: orderInfo.coffee
  });
  var email = $('<p>', {
    text: orderInfo.email
  });

  item.append(email);
  item.append(coffee);
  return item;
}

function drawAllOrders(ordersObject) {
  console.log('drawing orders!');
  console.log(ordersObject);

  var ordersArray = Object.keys(ordersObject).map(function (k) {
    var order = ordersObject[k];
    order[k] = k;
    return order;
  });
  $(SELECTORS.LIST).append(ordersArray.map(drawOrder));
}

function eraseOrders(val) {
  console.log('erasing orders...');
  $(SELECTORS.LIST).empty();
  return val;
}

function getAllCoffeeOrders() {
  return $.get(SERVER_URL);
}

function main() {
  setInterval(function () {
    getAllCoffeeOrders()
      .then(eraseOrders)
      .then(drawAllOrders)
  }, 2000)
}

main();

