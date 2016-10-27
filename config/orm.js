/*
 Here is the O.R.M. where you write functions that takes inputs and conditions and turn them into database commands like SQL.
 */
var connection = require('../config/connection.js');

// adds '?' to query
function printQuestionMarks(num){
    var arr = [];

    for (var i=0; i<num; i++){
        arr.push('?')
    }

    return arr.toString();
}

// converts object properties to a comma separated string to use in the sql query
function objToSql(ob)
{
    //column1=value, column2=value2,...
    var arr = [];

    for(var key in ob)
    {
        arr.push(key + '=' + ob[key]);
    }

    return arr.toString();
}

var orm =
{
    //select function of orm
    selectAll: function(tableInput, cb)
    {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result)
        {
            if(err) throw err;
            cb(result);
        });
    },
    //vals is an array of values that we want to save to cols
    //cols are the columns we want to insert the values into
    insertOne: function(table, cols, vals, cb)
    {
        var queryString = 'INSERT INTO ' + table;

        queryString = queryString + ' (';
        queryString = queryString + cols.toString();
        queryString = queryString + ') ';
        queryString = queryString + 'VALUES (';
        queryString = queryString + printQuestionMarks(vals.length);
        queryString = queryString + ') ';

        console.log(queryString);

        connection.query(queryString, vals, function(err, result)
        {
            if(err) throw err;
            cb(result);
        });
    },
    //objColVals would be the columns and values that you want to update
    //an example of objColVals would be {burger_name: BeefBurger, devoured: true}
    updateOne: function(table, objColVals, condition, cb)
    {
        var queryString = 'UPDATE ' + table;

        queryString = queryString + ' SET ';
        queryString = queryString + objToSql(objColVals);
        queryString = queryString + ' WHERE ';
        queryString = queryString + condition;

        console.log(queryString);
        connection.query(queryString, function(err, result)
        {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;