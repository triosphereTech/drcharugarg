export function buildAppointmentGroupId() {
  return `group_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getAppointmentFee(service, appointmentType) {
  if (!service) return 0;

  return appointmentType === "followup"
    ? Number(service.followUpFee || 0)
    : Number(service.initialFee || 0);
}

export function resolveFollowUpBookingContext(parentAppointment, service) {
  if (!parentAppointment || !service) {
    return {
      serviceName: null,
      serviceId: null,
      appointmentGroupId: null,
      fee: 0,
    };
  }

  return {
    serviceName: service.name || parentAppointment.service || null,
    serviceId: service._id?.toString?.() || parentAppointment.serviceId?.toString?.() || null,
    appointmentGroupId: parentAppointment.appointmentGroupId || buildAppointmentGroupId(),
    fee: getAppointmentFee(service, "followup"),
  };
}
