require('dotenv').config(); // include .env file

var mysql = require('mysql');
const connection_config = require('./connection');

var db_config;

switch (process.env.NODE_ENV) {
    case 'production':
        db_config = {
            connectionLimit: 100,
            waitForConnections: true,
            queueLimit: 0,
            host: connection_config.production.host,
            port: connection_config.development.port,
            database: connection_config.production.database,
            user: connection_config.production.username,
            password: connection_config.production.password,
            // debug: true,
            wait_timeout: 28800,
            connect_timeout: 10
        };
        break;
    case 'testing':
        db_config = {
            connectionLimit: 100,
            waitForConnections: true,
            queueLimit: 0,
            host: connection_config.testing.host,
            port: connection_config.development.port,
            database: connection_config.testing.database,
            user: connection_config.testing.username,
            password: connection_config.testing.password,
            // debug: true,
            wait_timeout: 28800,
            connect_timeout: 10
        };
        break;
    default:
        db_config = {
            connectionLimit: 100,
            waitForConnections: true,
            queueLimit: 0,
            host: connection_config.development.host,
            port: connection_config.development.port,
            database: connection_config.development.database,
            user: connection_config.development.username,
            password: connection_config.development.password,
            // debug: true,
            wait_timeout: 28800,
            connect_timeout: 10
        };
}

//- Create the connection variable
var connection = mysql.createPool(db_config);

//-
//- Establish a new connection
//-
connection.getConnection(function (err) {
    if (err) {
        // mysqlErrorHandling(connection, err);
        console.log("\n*** Cannot establish a connection with the database. ***");

        connection = reconnect(connection);
    } else {
        console.log("\n*** New connection established with the database. ***")
    }
});

//-
//- Reconnection function
//-
function reconnect(connection) {
    console.log("\n New connection tentative...");

    //- Create a new one
    connection = mysql.createPool(db_config);

    //- Try to reconnect
    connection.getConnection(function (err) {
        if (err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect(connection), 2000);
        } else {
            console.log("\n*** New connection established with the database. ***")
            return connection;
        }
    });
}

//-
//- Error listener
//-
connection.on('error', function (err) {

    //-
    //- The server close the connection.
    //-
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

    else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
    }

    else {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }

});

module.exports = connection;