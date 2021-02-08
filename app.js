const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ['Learn Javascript'
];
var workItems = [];
var officeItems = [];
app.set('view engine', 'ejs'); //EJS support code

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
//Main part
app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    var day = today.toLocaleDateString("en-US", options);
    console.log(day);

    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", function (req, res) {
    var item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else if (req.body.list === "Office") {
        officeItems.push(item);
        res.redirect("/office");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

//Work Part
app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/work", function (req, res) {
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

//Office
app.get("/office", function (req, res) {
    res.render("list", {
        listTitle: "Office List",
        newListItems: officeItems
    });
});

app.post("/office", function (req, res) {
    var item = req.body.newItem;
    officeItems.push(item);
    res.redirect("/office");
});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})