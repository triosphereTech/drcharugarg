import test from "node:test";
import assert from "node:assert/strict";

import { buildAppointmentGroupId, getAppointmentFee, resolveFollowUpBookingContext } from "./appointmentGroup.js";

test("buildAppointmentGroupId creates a prefixed consultation group id", () => {
  const id = buildAppointmentGroupId();

  assert.ok(id);
  assert.match(id, /^group_/);
  assert.ok(id.length > 12);
});

test("getAppointmentFee uses initial fee for initial consultations", () => {
  const fee = getAppointmentFee(
    { initialFee: 500, followUpFee: 250 },
    "initial"
  );

  assert.equal(fee, 500);
});

test("getAppointmentFee uses follow-up fee for follow-up consultations", () => {
  const fee = getAppointmentFee(
    { initialFee: 500, followUpFee: 250 },
    "followup"
  );

  assert.equal(fee, 250);
});

test("resolveFollowUpBookingContext derives service and group from the parent appointment", () => {
  const context = resolveFollowUpBookingContext(
    {
      service: "Acne Treatment",
      serviceId: "service_123",
      appointmentGroupId: "group_alpha",
      fee: 500,
    },
    { followUpFee: 250, name: "Acne Treatment", _id: "service_123" }
  );

  assert.equal(context.serviceName, "Acne Treatment");
  assert.equal(context.serviceId, "service_123");
  assert.equal(context.appointmentGroupId, "group_alpha");
  assert.equal(context.fee, 250);
});
