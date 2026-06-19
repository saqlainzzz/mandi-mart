import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });

    if (existing) {
      return Response.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashed,
      role: "member",
    });

    const token = await createToken({
      id: user._id.toString(),
      role: user.role,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return Response.json({
      success: true,
      user: { name: user.name, role: user.role },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
