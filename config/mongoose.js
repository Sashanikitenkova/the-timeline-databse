const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sasha1207:Sasha1207@cluster0.wgmkxtc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => {
    console.log('DB is connected');
   })
   .catch(err => {
    console.log(err);
   })