/*
 Here is where you setup a model for how to interface with the database.
 */
var orm = require('../config/orm.js');

//the actual object that interacts with the orm created, we just need to pass in the table name, columns and values
var burger =
{
    // calls orms select query with burger table
    selectAll: function(cb)
    {
        orm.selectAll('burgers', function(result)
        {
            cb(result);
        });
    },
    //cols and vals are arrays
    insertOne: function(cols, vals, cb)
    {
        orm.insertOne('burgers', cols, vals, function(res)
        {
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb)
    {
        orm.updateOne('burgers', objColVals, condition, function(res)
        {
            cb(res);
        });
    }
};

module.exports = burger;