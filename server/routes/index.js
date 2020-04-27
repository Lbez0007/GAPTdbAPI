// Creating routing to determine how app responds to a client request - part of MIDDLEWARE

const express = require('express');
const db = require ('../db');

const dbUsers = require ('../db/users');
const dbExpenses = require ('../db/expenses');
const dbPreferences = require ('../db/preferences');
const dbAnalytics = require ('../db/analytics');

const auth = require('../authentication/token-verification')
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Standard get request of url myvault.technology/api/
router.get('/', (request, response) => {
  response.json({ info: 'API  for MyVault App.' });
});

router;
// Types of requests,routed thorugh the db folder

//userlist requests
router.get('/users', auth, dbUsers.getUsers); 
router.get('/users/details', auth, dbUsers.getUserDetails); 
router.post('/users', dbUsers.createUsers);
router.post('/login', dbUsers.performLogin);
router.put('/users/update', dbUsers.updateUsers);
router.delete('/users', auth, dbUsers.deleteUsers);

//expenselist requests
router.get('/expenses/', auth, dbExpenses.getExpensesByUser); 
router.get('/expenses/w/', auth, dbExpenses.getExpensesByUserPerWeek); 
router.get('/expenses/m/', auth, dbExpenses.getExpensesByUserPerMonth); 
router.get('/expenses/y/', auth, dbExpenses.getExpensesByUserPerYear); 
router.post('/expenses', auth, dbExpenses.createExpense);
router.delete('/expenses/del/:expenseid', auth, dbExpenses.deleteExpense);

//preferenceslist requests
router.get('/pref', auth, dbPreferences.getPreferencesByUser); 
router.put('/pref', auth, dbPreferences.updatePreferencesByUser); 

//analytics requests
router.get('/analytics/CategoryTotals', auth, dbAnalytics.getExpensesByCategory); 
router.get('/analytics/CategoryTotals/w/', auth, dbAnalytics.getExpensesByCategoryPerWeek); 
router.get('/analytics/CategoryTotals/m/', auth, dbAnalytics.getExpensesByCategoryPerMonth); 
router.get('/analytics/CategoryTotals/y/', auth, dbAnalytics.getExpensesByCategoryPerYear); 
router.get('/analytics/MonthlyTotals', auth, dbAnalytics.getMonthlyExpenses); 
router.get('/analytics/CurrencyTotals', auth, dbAnalytics.getExpensesByCurrency); 




module.exports = router;