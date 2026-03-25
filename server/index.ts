import express from 'express';
import calculatorRouter from './routes/calculator.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.use('/api/calculator', calculatorRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
