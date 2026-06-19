import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password);

    if (!valid) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

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
