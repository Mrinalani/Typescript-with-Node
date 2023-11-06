//const express = require('express');
import express from 'express'

import todoroutes from './routes/todos'

import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())

app.use(todoroutes)
 
app.listen(3000)