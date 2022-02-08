const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors());

const dataRoute = require("./routes/data")

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"))
}

const connection = mongoose.connect(
    process.env.DB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connection
  .then((response) => {
    console.log("Database has been connected!");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port: 8000`);
    });
  })
  .catch((err) => {
    console.log(err);
  }
);

app.post("/send_mail", cors(), async (req, res) => {
	let text = req.body.email

	const transport = nodemailer.createTransport({
		host: "smtp.gmail.com",
    port: 465,
    	auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
		}
	})

	await transport.sendMail({
		from: "youthtime038@gmail.com",
		to: "info@redpositive.in",
		subject: "test email",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>${Object.values(text[0])}</p>
    
        <p>Gaurav</p>
         </div>
    `
	})
})
app.use('/data', dataRoute)


