var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var email = 'dexdevtech@gmail.com';

function onOpen() {
  sendExpensesNotification();
  sendIncomeNotification();
}

// EXPENSES
function sendExpensesNotification() {
  var expenses = -(sheet.getRange('B8').getValue()); 

  var expensesLimitWarning = 2500;
  var expensesLimitRedAlert = 3500; 

  if (expenses > expensesLimitRedAlert) {
    sendExpensesLimitRedAlert();
  }
  else if (expenses > expensesLimitWarning) {
    sendExpensesLimitWarning();
  }
}

function sendExpensesLimitRedAlert() {
  var message = HtmlService.createHtmlOutputFromFile('expensesLimitRedAlert').getContent();
  MailApp.sendEmail({
    to: email,
    subject: 'Expenses Limit Red Alert',
    htmlBody: message
  });
}

function sendExpensesLimitWarning() {
  var message = HtmlService.createHtmlOutputFromFile('expensesLimitWarning').getContent();
  MailApp.sendEmail({
    to: email,
    subject: 'Expenses Limit Warning',
    htmlBody: message
  });
}


// INCOME
function sendIncomeNotification() {
  var income = sheet.getRange('B12').getValue();

  var minimumIncomeReached = 1500;
  var incomeGoalSurpass   = 8000; 

  if (income > incomeGoalSurpass) {
    sendIncomeGoalSurpassed();
  }
  else if (income > minimumIncomeReached) {
    sendMinimumIncomeReached();
  }
}

function sendIncomeGoalSurpassed() {
  var message = HtmlService.createHtmlOutputFromFile('incomeGoalSurpassed').getContent();
  MailApp.sendEmail({
    to: email,
    subject: 'WEEKLY INCOME GOAL SURPASSED!',
    htmlBody: message
  });
}

function sendMinimumIncomeReached() {
  var message = HtmlService.createHtmlOutputFromFile('minimumIncomeReached').getContent();
  MailApp.sendEmail({
    to: email,
    subject: 'Minimum Weekly Income Reached!',
    htmlBody: message
  });
}



