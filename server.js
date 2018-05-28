var app = require('./app');
var port = process.env.PORT || 3000;
//var cors = require('cors');

// app.use('/', (req, res)=>{
//   res.json({message:"welcome home"})


// })

app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "POST") {
    res.status(200).end();
  } else {
    next();
  }
});




var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});