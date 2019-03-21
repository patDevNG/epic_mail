import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from'body-parser';
import routes from './usingObjects/routes/v1';
import routes2 from './usingDb/routes/v2';


const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);
app.use('/',routes2)


const PORT = process.env.PORT || 7080;


 const server = app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`);
});

export default server;
