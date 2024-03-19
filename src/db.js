const { response } = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Seyha:Seyha2023pp@cluster0.byk08bk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((response)=>{
    console.log('Connected to MongoDB');
});