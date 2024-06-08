import cron from 'node-cron';
import { deleteOldAppointments } from '../services/appointment.service';

cron.schedule('0 0 * * *', async () => {
  console.log('Running the deleteOldAppointments cron job');
  try {
    await deleteOldAppointments();
    console.log('Old appointments deleted successfully');
  } catch (error) {
    console.error('Error deleting old appointments:', error);
  }
});
