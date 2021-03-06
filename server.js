const User = require('./models/user');
const Category = require('./models/category');
const Subcategory = require('./models/subcategory');
const Transaction = require('./models/transaction');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {

    //take the name, username and the password from the ajax api call
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {

            //display it
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the ncrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                name,
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                //if creating a new user in the DB is succefull
                if (item) {

                    //display the new user
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/login', function (req, res) {

    //take the username and the password from the ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //using the mongoose DB schema, connect to the database and the user with the same username as above
    User.findOne({
        username: username
    }, function (err, items) {

        //if the there is an error connecting to the DB
        if (err) {

            //display it
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        // if there are no users with that username
        if (!items) {
            //display it
            return res.status(401).json({
                message: "Not found!"
            });
        }
        //if the username is found
        else {

            //try to validate the password
            items.validatePassword(password, function (err, isValid) {

                //if the connection to the DB to validate the password is not working
                if (err) {

                    //display error
                    console.log('Could not connect to the DB to validate the password.');
                }

                //if the password is not valid
                if (!isValid) {

                    //display error
                    return res.status(401).json({
                        message: "Password Invalid"
                    });
                }
                //if the password is valid
                else {
                    //return the logged in user
                    console.log(`User \`${username}\` logged in.`);
                    return res.json(items);
                }
            });
        };
    });
});

// -------------category ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new Category
app.post('/category/create', (req, res) => {
    let categoryName = req.body.categoryName;
    let username = req.body.username;

    Category.create({
        categoryName,
        username
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});
//GET category by username
app.get('/category/get/:username', function (req, res) {
    console.log(req.params.username);
    Category.find({
            username: req.params.username
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item);
            }
        });
});
// ------------subcategory ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new subcategory
app.post('/subcategory/create', (req, res) => {
    let subcategoryName = req.body.subcategoryName;
    let categoryBelongstoName = req.body.categoryBelongstoName;
    let budgetSubcategoryAmount = req.body.budgetSubcategoryAmount;
    let incomeExpense = req.body.incomeExpense;
    let username = req.body.username;

    Subcategory.create({
        subcategoryName,
        categoryBelongstoName,
        budgetSubcategoryAmount,
        incomeExpense,
        username
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});
//GET subcategory by username
app.get('/subcategory/get/:username', function (req, res) {
    console.log(req.params.username);
    Subcategory.find({
            username: req.params.username
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item);
            }

            function jsUcfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }).sort("subcategoryName");

});

// -------------transaction ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new Transaction
app.post('/transaction/create', (req, res) => {
    let transactionCategoryName = req.body.transactionCategoryName;
    let transactionSubcategoryName = req.body.transactionSubcategoryName;
    let transactionMonthName = req.body.transactionMonthName;
    let transactionAmount = req.body.transactionAmount;
    let incomeExpenseTransaction = req.body.incomeExpenseTransaction;
    let username = req.body.username;

    Transaction.create({
        transactionCategoryName,
        transactionSubcategoryName,
        transactionMonthName,
        transactionAmount,
        incomeExpenseTransaction,
        username
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});

//GET transaction by username
app.get('/transaction/get/:username', function (req, res) {
    console.log(req.params.username);
    Transaction.find({
            username: req.params.username
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item);
            }
        });
});

// DELETE ----------------------------------------
// deleting a transaction by id
app.delete('/delete-from-transaction-list/:id', function (req, res) {
    Transaction.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
}); // deleting an budgetsubcategory by id
app.delete('/delete-from-subcategory-list/:id', function (req, res) {
    Subcategory.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
