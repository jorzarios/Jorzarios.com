var express = require('express')
var app = express()
var nodemailer = require('nodemailer')
var creds = require('./creds');

var port = 9000;

console.log('listening on port', port);
var transporter = nodemailer.createTransport({
    service : 'gmail',
    host: "smtp.gmail-com",
    auth: {
      user: creds.user,
      pass: creds.pass
    }
  })

app.get('/', function (req, res) {
 res.sendFile(__dirname+'/views/index.html');
});

app.get('/about', function (req, res) {
 res.sendFile(__dirname+'/views/about.html');
});
app.get('/portafolio', function (req, res) {
 res.sendFile(__dirname+'/views/portafolio.html');
});
app.get('/contacto', function (req, res) {
 res.sendFile(__dirname+'/views/contacto.html');
});

app.get('/send', function (req,res) {

 var mailOptions = {
   from: 'Jorzarios.co',
   to: 'jorzarios@gmail.com',
   subject: req.query.subject,
   text: `Datos del cliente: ${req.query.name}, ${req.query.email}, ${req.query.phone}`
 }
 console.log(mailOptions);

 transporter.sendMail(mailOptions, function (error, response) {
   if(error){
     console.log(error);
     res.end('error');
   }else {
     console.log("Message sent ");
     res.end('sent')
   }
 })
})

app.listen(port, function (err) {
  if(err) return console.log('Hubo un error'), process.exit(1);

  console.log('Escuchando en el puerto', port);
})
