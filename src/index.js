import mongoose from 'mongoose';
import express, { application } from 'express';
import dotenv from 'dotenv';
import { DB_NAME } from './constants.js';
import ConnectDb from './db/index.js';
import { app } from './app.js';
dotenv.config({
    path: './.env',
});
ConnectDb().then(() => {
 app.listen(process.env.PORT || 1000 , () => {
    console.log(`Server is running on port : ${process.env.PORT}`)
 })
 app.on("error" , (err) => {
console.error("app.on FN error " , err);
 })
}).catch((err)=>{
    console.log("ConnectDb fn catch err :" , err)
});


