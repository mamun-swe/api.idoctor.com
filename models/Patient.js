const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: "patient",
      enum: ["patient"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline"],
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    age: {
      type: Number,
      trim: true,
      default: null,
    },
    height: {
      type: String,
      trim: true,
      default: null,
    },
    weight: {
      type: String,
      trim: true,
      default: null,
    },
    bloodPressure: {
      type: String,
      trim: true,
      default: null,
    },
    appointmentRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    access_token: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = model("Patient", patientSchema);

module.exports = Patient;
