import mongoose from "mongoose";

const AppointmentAvailabilitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppointmentSlotTemplate",
      default: null,
    },
    isOff: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

AppointmentAvailabilitySchema.index({ date: 1 });

AppointmentAvailabilitySchema.pre("validate", function (next) {
  if (this.isOff && this.templateId) {
    return next(
      new Error("A day off cannot have an assigned template.")
    );
  }

  if (!this.isOff && !this.templateId) {
    return next(
      new Error("Availability must either be marked as off or reference a template.")
    );
  }

  next();
});

const AppointmentAvailability =
  mongoose.models.AppointmentAvailability ||
  mongoose.model("AppointmentAvailability", AppointmentAvailabilitySchema);

export default AppointmentAvailability;
