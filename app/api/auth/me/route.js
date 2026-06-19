import { getSessionUser } from "@/lib/getSessionUser";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return Response.json({ user: null }, { status: 200 });
  }

  return Response.json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
