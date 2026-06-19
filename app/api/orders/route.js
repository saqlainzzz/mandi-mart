import { connectDB } from "@/lib/mongodb";
import Campaign from "@/models/Campaign";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const campaign =
      await Campaign.findById(
        body.campaignId
      );

    if (!campaign) {
      return Response.json(
        {
          success: false,
          error: "Campaign not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      campaign.status ===
      "completed"
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Campaign already completed",
        },
        {
          status: 400,
        }
      );
    }

    const quantityKg = Number(
      body.quantityKg
    );

    const remainingKg =
      campaign.targetKg -
      campaign.currentKg;

    if (
      quantityKg >
      remainingKg
    ) {
      return Response.json(
        {
          success: false,
          error: `Only ${remainingKg}kg remaining`,
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await Order.create({
        campaignId:
          body.campaignId,
        name: body.name,
        quantityKg,
      });

    campaign.currentKg +=
      quantityKg;

    if (
      campaign.currentKg >=
      campaign.targetKg
    ) {
      campaign.status =
        "completed";
    }

    await campaign.save();

    return Response.json({
      success: true,
      order,
      campaign,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
