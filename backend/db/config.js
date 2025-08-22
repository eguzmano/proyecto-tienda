import pg from 'pg'
import 'dotenv/config'


const { DATABASE_URL } = process.env

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase requiere SSL
  allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to DB:', err)
  } else {
    console.log('🔋 Db-Connected', res.rows[0])
  }
})

export default pool