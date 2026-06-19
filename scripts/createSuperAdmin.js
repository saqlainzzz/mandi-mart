require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function run() {
  const [, , name, email, password] = process.argv;

  if (!name || !email || !password) {
    console.log(
      "Usage: node scripts/createSuperAdmin.js \"Your Name\" you@example.com yourPassword"
    );
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI not found. Make sure .env.local has it set.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const UserSchema = new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: String,
    },
    { timestamps: true }
  );

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: email.toLowerCase() });

  if (existing) {
    existing.role = "superadmin";
    await existing.save();
    console.log(`Updated existing user ${email} to superadmin.`);
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: "superadmin",
    });
    console.log(`Created superadmin account for ${email}.`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
