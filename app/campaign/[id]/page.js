import OrderForm from "@/app/components/OrderForm";
import OrdersList from "@/app/components/OrdersList";
import DeleteCampaignButton from "@/app/components/DeleteCampaignButton";

async function getCampaign(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}`, {
    cache: "no-store",
  });

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
      <main className="min-h-screen bg-amber-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="bg-white dark:bg-stone-900 p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Campaign Not Found</h1>
        </div>
      </main>
    );
  }

  const percentage = Math.min((campaign.currentKg / campaign.targetKg) * 100, 100);
  const remainingKg = Math.max(campaign.targetKg - campaign.currentKg, 0);
  const totalValue = campaign.currentKg * campaign.pricePerKg;
  const completed = campaign.currentKg >= campaign.targetKg || campaign.status === "completed";

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-stone-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              {completed ? (
                <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm">
                  🎉 Campaign Completed
                </span>
              ) : (
                <span className="bg-white text-orange-700 px-4 py-2 rounded-full text-sm">
                  Active Campaign
                </span>
              )}
              <h1 className="text-4xl font-bold mt-4">{campaign.fruitName}</h1>
              <p className="mt-2 text-amber-50 text-xl">₹{campaign.pricePerKg}/kg</p>
            </div>

            <DeleteCampaignButton
              campaignId={campaign._id}
              fruitName={campaign.fruitName}
              redirectTo="/"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">
        {completed && (
          <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-800 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-lg text-stone-900 dark:text-white">🎉 Target Achieved</h2>
            <p className="text-stone-700 dark:text-stone-300">Community requirement has been fulfilled.</p>
          </div>
        )}

        <div className="bg-white dark:bg-stone-900 rounded-xl shadow-md p-6 border border-amber-100 dark:border-stone-800">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-stone-900 dark:text-white">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800 h-5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-5 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="mt-2 text-stone-600 dark:text-stone-400">
              {campaign.currentKg}kg of {campaign.targetKg}kg collected
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="border border-amber-100 dark:border-stone-800 rounded-lg p-4">
              <p className="text-stone-500 dark:text-stone-400">Target</p>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">{campaign.targetKg}kg</p>
            </div>
            <div className="border border-amber-100 dark:border-stone-800 rounded-lg p-4">
              <p className="text-stone-500 dark:text-stone-400">Current</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{campaign.currentKg}kg</p>
            </div>
            <div className="border border-amber-100 dark:border-stone-800 rounded-lg p-4">
              <p className="text-stone-500 dark:text-stone-400">Remaining</p>
              <p className="text-2xl font-bold text-rose-500 dark:text-rose-400">{remainingKg}kg</p>
            </div>
            <div className="border border-amber-100 dark:border-stone-800 rounded-lg p-4">
              <p className="text-stone-500 dark:text-stone-400">Total Value</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{totalValue}</p>
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-amber-50 dark:bg-stone-800/50 border border-amber-100 dark:border-stone-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-stone-900 dark:text-white">Community Stats</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-stone-500 dark:text-stone-400">Ordered</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">{campaign.currentKg}kg</p>
              </div>
              <div>
                <p className="text-stone-500 dark:text-stone-400">Target</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">{campaign.targetKg}kg</p>
              </div>
              <div>
                <p className="text-stone-500 dark:text-stone-400">Remaining</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">{remainingKg}kg</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="border-t border-amber-100 dark:border-stone-800 pt-6">
            <h2 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Place Your Order</h2>

            {!completed ? (
              <>
                <p className="text-stone-600 dark:text-stone-400 mb-4">
                  Enter your name and quantity required.
                </p>
                <OrderForm campaignId={campaign._id} />
              </>
            ) : (
              <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-800 rounded-lg p-4 mb-4 text-stone-900 dark:text-white">
                Orders are closed because the target has been achieved.
              </div>
            )}

            <OrdersList campaignId={campaign._id} />
          </div>
        </div>
      </div>
    </main>
  );
}