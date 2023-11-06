const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
const port = process.env.URL_SERVER || 3001;
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