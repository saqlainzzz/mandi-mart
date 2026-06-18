import { connectDB } from "@/lib/mongodb";
import Campaign from "@/models/Campaign";

export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const campaign = await Campaign.findById(id);

    return Response.json(campaign);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}