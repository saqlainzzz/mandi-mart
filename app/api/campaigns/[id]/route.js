import { connectDB } from "@/lib/mongodb";
import Campaign from "@/models/Campaign";
import Order from "@/models/Order";
import { getSessionUser } from "@/lib/getSessionUser";

export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const campaign = await Campaign.findById(id);

    return Response.json(campaign);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !["admin", "superadmin"].includes(sessionUser.role)) {
      return Response.json(
        { error: "Only admins can delete a campaign" },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await context.params;

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return Response.json({ error: "Campaign not found" }, { status: 404 });
    }

    await Order.deleteMany({ campaignId: id });
    await Campaign.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
