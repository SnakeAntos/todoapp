const express = require('express');
const app = express();
const port = process.env.PORT || 3001; 
const todoRoutes = require('./routes/todoRoutes')
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes")

app.use(cors());
app.use(bodyParser.json());
app.use('/', todoRoutes);
app.use('/auth', authRoutes)

//al final
app.listen(port, () =>{
    console.log(`Servidor escuchado en el puerto ${port}`);
});