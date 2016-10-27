/*
 Here is where you create all the functions that will do the routing for your app, and the logic of each route.
 */
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//redirects to /burgers from index of whatever root you serve the site from
router.get('/', function(req,res)
{
    res.redirect('/burgers')
});

//gets all burger data and passes it to handlebars to be processed
router.get('/burgers', function(req,res)
{
    burger.selectAll(function(data)
    {
        var hbsObject = {burgers : data};
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

//posts burger data from form to create route to fill in insert query
router.post('/burgers/create', function(req,res)
{
    burger.insertOne(['burger_name'], [req.body.burger_name], function(data)
    {
        res.redirect('/burgers')
    });
});

//updates the devoured state of a burger by passing in the id of the burger that was clicked
router.put('/burgers/update/:id', function(req,res)
{
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    console.log(req.body);

    burger.updateOne({'devoured' : 1}, condition, function(data)
    {
        res.redirect('/burgers');
    });
});

module.exports = router;