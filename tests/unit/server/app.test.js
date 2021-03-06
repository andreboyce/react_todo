"use strict";

require('dotenv').config();
//const dotenv = require('dotenv');
//dotenv.config();

const Sequelize = require('sequelize');

var express = require('express');

var bodyParser = require('body-parser');

var md5 = require('md5');

var jwt = require('jsonwebtoken');

var argv = require('minimist')(process.argv.slice(2));

const mysql = require( 'mysql2' );

const util = require('util');

function die (errMsg) 
{
   if (errMsg)
      console.error(errMsg);
   process.exit(1);
}

var database  = process.env.SERVER_DB_SCHEMA;
var username  = process.env.SERVER_DB_USERNAME;
var password  = process.env.SERVER_DB_PASSWORD;
var mysqlhost = process.env.SERVER_DB_HOST;

var secret_key = 'secret_key';
if ( typeof argv['secret_key'] !== 'undefined' && argv['secret_key'] )
{
  secret_key = argv['secret_key'];
}

//var mysqlhost = "localhost";
//var mysqlhost = "host.docker.internal";
if ( typeof argv['mysqlhost'] !== 'undefined' && argv['mysqlhost'] )
{
  mysqlhost = argv['mysqlhost'];
}

//die("database:" + database);

var useport = 8082;
if ( typeof argv['useport'] !== 'undefined' && argv['useport'] )
{
  useport = argv['useport'];
}

const sequelize = new Sequelize( database, username, password, {
  dialect: 'mysql',
  host: mysqlhost,  
  port: 3306,
  dialectOptions: {
    insecureAuth: true
  },
operatorsAliases: false,  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: { freezeTableName: true,
            timestamps: false }
});

const Todo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
  })
  .catch(err => {
    console.error('Unable to connect to the database: ', err);
    die("Unable to connect to the database");
  });



var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.get('/', function (req, res) {
  res.send('Home Page Server');
});

app.get('/about', function (req, res) {
  res.send('About');
});

// app.get( '/api/todo/get/:id/:offset/:limit', function (req, res) {
//app.findAll({ offset: 5, limit: 5 })

// Get all todo items
app.get( '/api/todo/get', function (req, res) {
  //res.send('List');
  Todo.findAll( { } ).then(
    (resultset) =>
    {
      //res.header("Access-Control-Allow-Origin", "*");
      res.send(resultset);
      //console.log( resultset );
      resultset.forEach( (resultSetItem) => {
          //console.log( resultSetItem.get( { plain: true } ) );
      });
    }
  );
});

// Get a todo item
app.get( '/api/todo/get/:id', function (req, res) {
  Todo.findAll( { where: { id: req.params.id } } ).then(
    (resultset) =>
    {
      //res.send(resultset);

      if( typeof resultset !== 'undefined' && resultset[0] !== 0 && resultset )
      {
         res.json( resultset[0] );
      }
      else
      {
         res.json( { message: "No records were found" } );
      }

      //console.log( resultset );
      //resultset.forEach( (resultSetItem) => {
      //    console.log( resultSetItem.get( { plain: true } ) );
      //});
    }
  );
});

// Delete a todo item
app.delete( '/api/todo/delete/:id', function (req, res) {
  Todo.destroy( { where: { id: req.params.id } } ).then(
    (resultset) =>
    {
      console.log( "resultset: " + util.inspect(resultset, false, null, false) );

      if( typeof resultset !== 'undefined' && resultset )
      {
         res.json( { deleted: req.params.id, message: "Record with id: " + req.params.id + " was deleted" } );
      }
      else
      {
         res.json( { deleted: 0, message: "No records were deleted" } );
      }
    }
  )
  .catch( ( err ) => { console.error( "delete: " + err ) } );
});

// Update a todo item
app.put( '/api/todo/update/:id', function (req, res) {
  let todo_item = req.body;
  var values = { name: todo_item.name, 
                 description: todo_item.description,
                 date: todo_item.date };
  var selector = { where: { id: req.params.id }  };
  Todo.update( values, selector ).then(
    (resultset) =>
    {
      //console.log( "resultset: " + util.inspect(resultset, false, null, false) );
      //console.log( "typeof resultset: " + util.inspect(typeof resultset, false, null, false) );

      if( typeof resultset !== 'undefined' && resultset[0] !== 0 && resultset )
      {
         res.json( { updated: req.params.id, message: "Record with id: " + req.params.id + " was updated" } );
      }
      else
      {
         res.json( { updated: 0, message: "No records were updated" } );
      }
      //res.send( "Rows affected: " + resultset );
      //resultset.forEach( (resultSetItem) => {
          //console.log( resultSetItem.get( { plain: true } ) );
          //console.log( resultSetItem );
      //});
    }
  );
});

// Create a todo item
app.post( '/api/todo/create', function (req, res) {

  let todo_item = req.body;
  //console.log( todo_item );
  Todo.create( { name: todo_item.name,
                 description: todo_item.description,
                 date: todo_item.date } ).then(
    (resultset) =>
    {
      //res.send( "Create: " + todo_item );
      //res.send( todo_item );
      //console.log( "/api/todo/create resultset: " + util.inspect(resultset[0], false, null, false) );

      //console.log( "/api/todo/create resultset.get: " + util.inspect( resultset.get( { plain: true } ), false, null, false) );
      //console.log( "/api/todo/create resultset.get: " + util.inspect( resultset.id, false, null, false) );

      res.json( { created: 1, message: "Record with id: " + "unknown" + " was created" } );

      /*if( typeof resultset !== 'undefined' && resultset[0] !== 0 && resultset )
      {
         //res.json( { created: resultset[0].id, message: "Record with id: " + resultset[0].id + " was created" } );
      }
      else
      {
         //res.json( { created: 0, message: "No records were created" } );
      }*/
    }
  )
  .catch( 
    ( err ) => 
    { 
      res.json( { created: 0, message: "No records were created" } );
      console.error( "Error: " + err );
    } 
  );
});


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  secret: {
    type: Sequelize.STRING
  },
});


function checkToken( req, res, next )
{
   const clientHeader = req.headers["authorization"];
   if( typeof clientHeader !== 'undefined' && clientHeader )
   {
      const client = clientHeader.split(" ");
      const clientToken = client[1];
      req.token = clientToken;
      next();
   }
   else
   {
      res.sendStatus(403);
   }
}

// Protected test
app.get( '/api/protected', checkToken, function (req, res) {
   //console.log( req.token );
   jwt.verify( req.token, secret_key, 
      function( err, data )
      {
         if( err )
         {
           res.sendStatus(403);
         }
         else
         {
           res.json( { data: data } );
         }
      });
});

// Login
app.post( '/api/login', function (req, res) {
  //User.find( { where: { email: req.body.email,
  User.findOne( { where: { email: req.body.email,
                        password: md5( req.body.password ), } } ).then(
    (resultset) =>
    {
      //res.send(resultset);
      let md5password = resultset.get( { plain: true } )[ 'password' ];
      let       email = resultset.get( { plain: true } )[ 'email' ];
      const   account = { password: md5password, email: email };
      const     token = jwt.sign( { account }, secret_key );
      res.json( { isLoggedin: true, token: token } );
      //console.log( resultset.get( { plain: true } ) );
      //console.log( resultset );
    }
  ).catch(
    ( err ) => { console.error( "Error: " + err ) }
  );
});

/*
// Login
app.get( '/api/login/:secret', function (req, res) {
  
  User.findAll( { where: { secret: req.params.secret } } ).then(
    (resultset) =>
    {
      res.send(resultset);
      //console.log( resultset );
      resultset.forEach( (resultSetItem) => {
          //console.log( resultSetItem.get( { plain: true } ) );
      });
    }
  );
});
*/
 
app.listen(useport);
