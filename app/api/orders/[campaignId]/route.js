import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(request, context) {
  try {
    await connectDB();

    const { campaignId } = await context.params;

    const orders = await Order.find({
      campaignId: campaignId,
    }).sort({
      createdAt: -1,
    });

    return Response.json(orders);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}