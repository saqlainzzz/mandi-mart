import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getSessionUser } from "@/lib/getSessionUser";

export async function GET() {
  const sessionUser = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "superadmin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const users = await User.find()
    .select("name email role createdAt")
    .sort({ createdAt: -1 });

  return Response.json(users);
}

export async function POST(request) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "superadmin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();

    const { userId, role } = await request.json();

    if (!["member", "admin"].includes(role)) {
      return Response.json({ error: "Invalid role" }, { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role === "superadmin") {
      return Response.json(
        { error: "Cannot change the superadmin's role" },
        { status: 400 }
      );
    }

    user.role = role;
    await user.save();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
