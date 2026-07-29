export async function deleteAppointment(appointmentId) {
  try {
    console.log("inside delete ",appointmentId);
    
    await fetch(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}