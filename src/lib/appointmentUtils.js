export async function deleteAppointment(appointmentId) {
  try {
    
    await fetch(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}