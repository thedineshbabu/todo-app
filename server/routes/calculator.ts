import { Router, Request, Response } from 'express';

const router = Router();

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
const VALID_OPERATIONS: ReadonlySet<string> = new Set(['add', 'subtract', 'multiply', 'divide']);

router.post('/', (req: Request, res: Response) => {
  const { a, b, operation } = req.body as { a: unknown; b: unknown; operation: unknown };

  if (typeof a !== 'number' || typeof b !== 'number' || typeof operation !== 'string') {
    res.status(400).json({ error: 'Fields a (number), b (number), and operation (string) are required.' });
    return;
  }

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    res.status(422).json({ error: 'Both a and b must be whole numbers (integers). Decimals are not allowed.' });
    return;
  }

  if (!VALID_OPERATIONS.has(operation)) {
    res.status(400).json({ error: "operation must be one of: 'add', 'subtract', 'multiply', 'divide'." });
    return;
  }

  const op = operation as Operation;

  if (op === 'divide' && b === 0) {
    res.status(400).json({ error: 'Division by zero is not allowed.' });
    return;
  }

  let result: number;
  switch (op) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      result = a / b;
      break;
  }

  res.json({ result });
});

export default router;
