import { connectDB } from "@/lib/mongodb";
import Campaign from "@/models/Campaign";

export async function GET() {
  await connectDB();

  const campaigns =
    await Campaign.find().sort({
      createdAt: -1,
    });

  return Response.json(campaigns);
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const campaign =
      await Campaign.create({
        fruitName: body.fruitName,
        pricePerKg: body.pricePerKg,
        targetKg: body.targetKg,
        currentKg: 0,
        status: "active",
      });

    return Response.json(campaign);
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}