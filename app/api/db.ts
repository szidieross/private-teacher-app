import { createConnection, Connection } from 'mysql2/promise';

let connection: Connection;

export const connectDB = async () => {
  try {
    connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'online_foto_album'
    });
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
};

export const getConnection = () => {
  if (!connection) {
    throw new Error('Database connection not established');
  }
  return connection;
};

export const getAllUsers = async () => {
    const connection = getConnection();
    try {
      const [rows, fields] = await connection.execute('SELECT username, email FROM users');
      console.log("rows")
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };
