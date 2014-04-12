var express = require('express');
var app = express();

var users = [
    { id: 1, name: 'Kyle Broflovski', email:'kyle@southpark.com', role: 'A Jew' },
    { id: 2, name: 'Stan Marsh', email:'stan@southpark.com', role: 'Not a Jew' },
    { id: 3, name: 'Eric Cartman', email:'cartman@southpark.com', role: 'Eats a lot' },
    { id: 4, name: 'Kenny McCormick', email:'kenny@southpark.com', role: 'Dies a lot' }
];

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
});

app.get('/', function(req, res) {
    res.json(users);
});

app.get('/list', function(req, res) {
    res.json(users);
});

app.get('/list/:id', function(req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id){
            return res.json(users[i]);
        }
    }
    res.statusCode = 404;
    return res.send('Error 404: No user found');
});

app.put('/list/:id', function(req, res) {
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('role')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }
    var saved = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.body.id){
            users[i].name = req.body.name;
            users[i].email = req.body.email;
            users[i].role = req.body.role;
            saved = true;
        }
    }

    res.json(saved);
});

app.post('/list/add', function(req, res) {
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('role')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newUser = {
        id : users.length + 1,//Mr. Hacky was here
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    };

    users.push(newUser);
    res.json(true);
});

app.delete('/list/:id', function(req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id){
            var indexOfArray = users.indexOf(users[i]);
            console.log(indexOfArray);
            users.splice(indexOfArray, 1);
            return res.json(true);
        }
    }

    res.statusCode = 404;
    return res.send('Error 404: No user found');
});

app.listen(process.env.PORT || 3412);