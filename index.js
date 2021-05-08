
var app = require('./app');
var  sql = require('./app');

const PORT = process.env.PORT || 3050

app.listen(PORT, ()=>{
    console.log(`Server running on: http://localhost:${PORT}.`);
})

