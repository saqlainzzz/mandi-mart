import OrderForm from "@/app/components/OrderForm";
import OrdersList from "@/app/components/OrdersList";

async function getCampaign(id) {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}`,
  {
    cache: "no-store",
  }
);

  if (!res.ok) {
    throw new Error("Failed to fetch campaign");
  }

  return res.json();
}

export default async function CampaignPage({ params }) {
  const { id } = await params;

  const campaign = await getCampaign(id);

  if (!campaign) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold">
            Campaign Not Found
          </h1>
        </div>
      </main>
    );
  }

  const percentage = Math.min(
    (campaign.currentKg / campaign.targetKg) * 100,
    100
  );

  const remainingKg = Math.max(
    campaign.targetKg - campaign.currentKg,
    0
  );

  const totalValue =
    campaign.currentKg *
    campaign.pricePerKg;

  const completed =
    campaign.currentKg >=
      campaign.targetKg ||
    campaign.status === "completed";

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-green-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="mb-4">
            {completed ? (
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                🎉 Campaign Completed
              </span>
            ) : (
              <span className="bg-white text-green-700 px-4 py-2 rounded-full">
                Active Campaign
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold">
            {campaign.fruitName}
          </h1>

          <p className="mt-2 text-green-100 text-xl">
            ₹{campaign.pricePerKg}/kg
          </p>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">

        {completed && (
          <div className="bg-green-100 border border-green-300 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-lg">
              🎉 Target Achieved
            </h2>

            <p>
              Community requirement has been fulfilled.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">

          {/* Progress */}
          <div className="mb-8">

            <div className="flex justify-between mb-2">
              <span className="font-medium">
                Progress
              </span>

              <span className="font-bold">
                {percentage.toFixed(0)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
              <div
                className="bg-green-600 h-5 transition-all"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <div className="mt-2 text-gray-600">
              {campaign.currentKg}kg of{" "}
              {campaign.targetKg}kg collected
            </div>

          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">
                Target
              </p>

              <p className="text-2xl font-bold">
                {campaign.targetKg}kg
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">
                Current
              </p>

              <p className="text-2xl font-bold text-green-600">
                {campaign.currentKg}kg
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">
                Remaining
              </p>

              <p className="text-2xl font-bold text-orange-500">
                {remainingKg}kg
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">
                Total Value
              </p>

              <p className="text-2xl font-bold text-blue-600">
                ₹{totalValue}
              </p>
            </div>

          </div>

          {/* Community Stats */}
          <div className="bg-gray-50 border rounded-xl p-6 mb-8">

            <h2 className="text-xl font-bold mb-4">
              Community Stats
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <p className="text-gray-500">
                  Ordered
                </p>

                <p className="text-2xl font-bold">
                  {campaign.currentKg}kg
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Target
                </p>

                <p className="text-2xl font-bold">
                  {campaign.targetKg}kg
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Remaining
                </p>

                <p className="text-2xl font-bold">
                  {remainingKg}kg
                </p>
              </div>

            </div>

          </div>

          {/* Order Form */}
          <div className="border-t pt-6">

            <h2 className="text-2xl font-bold mb-4">
              Place Your Order
            </h2>

            {!completed ? (
              <>
                <p className="text-gray-600 mb-4">
                  Enter your name and quantity required.
                </p>

                <OrderForm
                  campaignId={campaign._id}
                />
              </>
            ) : (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                Orders are closed because the target has been achieved.
              </div>
            )}

            <OrdersList
              campaignId={campaign._id}
            />

          </div>

        </div>

      </div>

    </main>
  );
}