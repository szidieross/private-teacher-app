// import { getConnection } from './db';

// export const createUser = async (username: string, email: string, password: string) => {
//   const connection = getConnection();
//   try {
//     await connection.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
//     console.log('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
// };
