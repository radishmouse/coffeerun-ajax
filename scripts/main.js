
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

function transformData(ordersObject) {
  console.log(ordersObject);

  return Object.values(ordersObject);

}

function storeData(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));

  return data;
}

function loadData() {
  return JSON.parse(localStorage.getItem(LS_KEY));
}

function drawAllOrders(ordersArray) {
  console.log('drawing orders!');
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
      .then(storeData)
      .catch(loadData)
      .then(eraseOrders)
      .then(transformData)
      .then(drawAllOrders)
  }, 2000)
}

main();

