# Postgresql as pg

## CRUD

### Create Register using pool.query

```javascript
const pool = require('./db');

pool.query('INSERT INTO public.users(name, age) VALUES($1, $2)', ['John Doe', 30], (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
```

### Read Register using pool.query

```javascript
const pool = require('./db');

pool.query('SELECT * FROM public.users', (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows);
  }
});
```

### Update Register using pool.query

```javascript

const pool = require('./db');

pool.query('UPDATE public.users SET name = $1 WHERE id = $2', ['John Doe', 1], (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
```

### Delete Register using pool.query

```javascript

const pool = require('./db');

pool.query('DELETE FROM public.users WHERE id = $1', [1], (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
```

### Find by ID using pool.query

```javascript

const pool = require('./db');

pool.query('SELECT * FROM public.users WHERE id = $1', [1], (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
```