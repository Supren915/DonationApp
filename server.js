const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var sql = require('mssql/msnodesqlv8');
const app = express();

app.set('view engine', 'pug');  // This is a template engine, this lets the body parser work.

// This converts the scripts route to static.
// so scripts/app.js will be static/app.js.
app.use('/static', express.static('scripts'))  
app.use(bodyParser.urlencoded({extended: false}))  //This lets us read the html values  (name, email, etc...)


// define route 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/index.html'));
})  

app.post('/submit',function (req,res) {
    console.log("Felix's REquest body", req.body);  // This will display all HTML elements with names assigned to them.
    // res.render('index', {title: 'Data Saved', message: 'Data Saved Successfully.'})

    // Lets update the database with the form data
    // Begin SQL connection here
    var pool = new sql.ConnectionPool({
        database: 'DonationApp',
        server: 'localhost\\SQLEXPRESS',
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }
    })

    const pool1Connect = pool.connect();
    
    pool.on('error', err => {
        console.log("poo1 Error: ", err);
    })

    insertData();

    async function insertData() {
        await pool1Connect; // wait till connection pool is created
        try {
            var myQuery = "INSERT INTO DonationsTable (FirstName, LastName, EmailAddress, DonationAmount, CreditCardNumber, FinalDonationAmount) " + 
            "VALUES ('"+ req.body.fName + "', '" + req.body.lName + "', '" + req.body.emailAddress + "', '" + req.body.donationAmount + "', " + req.body.creditCardNumber + ", '" + req.body.finalAmount + "')";
    
            const request = pool.request(); // or: new sql.Request(pool1)
            const result = await request.query(myQuery)
            console.log(result)

            // Display Thank you page
            // res.render('index', {title: 'Data Saved', message: 'Thank you for your donation!'})
            res.sendFile(path.join(__dirname,'/final.html'));
            pool.close();
            return result;
        } catch (err) {
            console.log('SQL error', err);
        }
    }
})




app.listen(3000, () => console.log("Listening on Port 3000"));
