import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'pass',
  database: process.env.DB_NAME     || 'crear',
  port:     Number(process.env.DB_PORT) || 5433,
})

pool.connect((err) => {
  if (err) {
    console.error('ERROR conexión BD:', err.message)
  } else {
    console.log('BD conectada correctamente')
  }
})

export default pool
