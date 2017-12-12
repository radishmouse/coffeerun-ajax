
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


  // Step 1. Grab just the email addresses.
  var emails = Object.keys(ordersObject);

  // Step 2. Convert emails into Ajax promises.
  var arrayOfPromises = emails.map(getSingleCoffeeOrder);

  // Step 3. Wait for all the promises to resolve.
  Promise.all(arrayOfPromises)
    .then(function (arrayOfResults) {  // Step 4. Wait for the results to come back.

      // Step 5. Transform results into DOM elements.
      var arrayOfDOMElements = arrayOfResults.map(drawOrder);

      // Step 6. Append DOM elements to the page.
      $(SELECTORS.LIST).append(arrayOfDOMElements);
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

