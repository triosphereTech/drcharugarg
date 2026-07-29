import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const AppointmentSlotTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      default: "blue",
    },
    slots: {
      type: [SlotSchema],
      validate: {
        validator(value) {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }

          const normalized = value.map((slot) => {
            const start = slot.startTime?.trim();
            const end = slot.endTime?.trim();
            return { start, end };
          });

          const slotKeys = new Set();
          for (const slot of normalized) {
            if (!/^\d{2}:\d{2}$/.test(slot.start) || !/^\d{2}:\d{2}$/.test(slot.end)) {
              return false;
            }
            if (slot.start >= slot.end) {
              return false;
            }
            const key = `${slot.start}-${slot.end}`;
            if (slotKeys.has(key)) {
              return false;
            }
            slotKeys.add(key);
          }

          const sorted = [...normalized].sort((a, b) => a.start.localeCompare(b.start));
          for (let index = 1; index < sorted.length; index += 1) {
            const previousEnd = sorted[index - 1].end;
            if (sorted[index].start < previousEnd) {
              return false;
            }
          }

          return true;
        },
        message:
          "Slot templates must contain valid, non-overlapping, unique time ranges.",
      },
    },
  },
  {
    timestamps: true,
  }
);

AppointmentSlotTemplateSchema.index({ name: 1 }, { unique: true });

const AppointmentSlotTemplate =
  mongoose.models.AppointmentSlotTemplate ||
  mongoose.model("AppointmentSlotTemplate", AppointmentSlotTemplateSchema);

export default AppointmentSlotTemplate;
