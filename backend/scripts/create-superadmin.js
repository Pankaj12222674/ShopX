import "../config/env.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
const required = ["MONGO_URI", "SUPERADMIN_NAME", "SUPERADMIN_EMAIL", "SUPERADMIN_PASSWORD"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB || "web_dev" });
  const email = process.env.SUPERADMIN_EMAIL.trim().toLowerCase();
  const password = process.env.SUPERADMIN_PASSWORD;
  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = "superadmin";
    existing.isActive = true;
    existing.password = await bcrypt.hash(password, 10);
    existing.name = process.env.SUPERADMIN_NAME.trim();
    await existing.save();
    console.log(`Updated ${email} as superadmin`);
  } else {
    await User.create({
      name: process.env.SUPERADMIN_NAME.trim(),
      email,
      password: await bcrypt.hash(password, 10),
      role: "superadmin",
    });
    console.log(`Created ${email} as superadmin`);
  }
} catch (error) {
  console.error("Unable to create superadmin:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
