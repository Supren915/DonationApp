function validateForm(){
    var firstName, lastName, email, creditCardNumber, donationAmount;
    var invalidForm = false;
    var errMessage = "";

    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("emailAddress").value;
    donationAmount = parseInt(document.getElementById("donationAmount").value);
    creditCardNumber = parseInt(document.getElementById("creditCardNumber").value);

    if (firstName.length == 0){
        invalidForm = true;
        errMessage += "Please Enter a First Name. <br>"
    }

    if (lastName.length == 0){
        invalidForm = true;
        errMessage += "Please Enter a Last Name. <br>"
    }

    if (!validateEmail(email)){
        invalidForm = true;
        errMessage += "Please Enter a valid email. <br>"
    }

    //  Check if Donation is a Number, then check if greater than 0
    if (!isNaN(donationAmount)){
        console.log("donationAmountcheck: Is a Number", donationAmount);
        if (donationAmount <= 0){
            invalidForm = true;
            errMessage += "Please Enter a valid donation amount of at least $1. <br>"
        }
    }else if (isNaN(donationAmount)){
        invalidForm = true;
        errMessage += "Please Enter a valid donation amount. <br>"
    }

    //  Check if CreditCard is a Number, then check for the proper length
    if (!isNaN(creditCardNumber)){
        if (creditCardNumber.toString().length != 16){
            invalidForm = true;
            errMessage += "Please Enter a valid credit card number (invalid digit length). <br>"
        }
    }else if (isNaN(creditCardNumber)){
        invalidForm = true;
        errMessage += "Please Enter a valid credit card number. <br>"
    }

    if (invalidForm){
        document.getElementById("frmMessage").innerHTML = errMessage;
        return false;
    }else{ 
        displayFinal();
    }
    
}

function displayFinal(){
    console.log("Update display divs")
    document.getElementById("DonationForm").style.display = "none"
    document.getElementById("submissionpage").style.display = "block"
}

function validateEmail(email){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailReg.test(email);
}

function updateDonationTable(){

/*
    async () => {
        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect('mssql://DbUser:password1@SQLEXPRESS/DonationApp')
            const result = await sql.query`select * from DonationsTable`
            console.dir("db result: " + result)
        } catch (err) {
            console.log("Error: " + err);
        }
    }    */

    /*
    var config = {
        server: 'SUPREN-PC\\SQLEXPRESS',
        database: 'DonationApp'
    };

    sql.ConnectionPool(config, function (err) {
        if (err) console.log(err);

        var sqlRequest = new sql.Request();
        var myQuery = "INSERT INTO DonationsTable (FirstName, LastName, EmailAddress, DonationAmount, CreditCardNumber) VALUES ('Felix', 'Test', 'supra@test.com', '$25.00', 1111444477773333)";

        sqlRequest.query(myQuery, function (err, data) {
            if (err) console.log(err)
    
            sql.close();
            console.log("MS SQL UPDATE COMPLETED!")
        })
    })    */
    
    var pool = new sql.ConnectionPool({
        server: 'SUPREN-PC\\SQLEXPRESS',
        database: 'DonationApp'
    })

    pool.connect(err => {
        if (err) console.log(err);

        var sqlRequest = new sql.Request();
        var myQuery = "INSERT INTO DonationsTable (FirstName, LastName, EmailAddress, DonationAmount, CreditCardNumber) VALUES ('Felix', 'Test', 'supra@test.com', '$25.00', 1111444477773333)";

        sqlRequest.query(myQuery, function (err, data) {
            if (err) console.log(err)
    
            pool.close();
            console.log("MS SQL UPDATE COMPLETED!")
        })
    })




    /*
    var connection = new sql.connection(config, function(err){
        var request = new sql.Request(connection);
        request.query(myQuery)
    })   */

    

}