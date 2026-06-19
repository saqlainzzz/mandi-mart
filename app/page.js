import DeleteCampaignButton from "./components/DeleteCampaignButton";

async function getCampaigns() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const campaigns = await getCampaigns();

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-5xl font-black tracking-tight">🛒 Mandi Mart</h1>
          <p className="mt-2 text-amber-50 text-lg">Community Bulk Buying Platform</p>
          
            href="/admin"
            className="inline-block mt-4 text-sm bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-colors"
          >
            ⚙️ Admin Panel
          </a>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-stone-800">
            <p className="text-stone-500 dark:text-stone-400 text-sm">Active Campaigns</p>
            <p className="text-3xl font-bold text-stone-900 dark:text-white">{campaigns.length}</p>
          </div>
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-stone-800">
            <p className="text-stone-500 dark:text-stone-400 text-sm">Community Driven</p>
            <p className="text-3xl font-bold text-stone-900 dark:text-white">🤝</p>
          </div>
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-stone-800">
            <p className="text-stone-500 dark:text-stone-400 text-sm">Transparency</p>
            <p className="text-3xl font-bold text-stone-900 dark:text-white">100%</p>
          </div>
        </div>
      </div>

      {/* Campaigns */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => {
            const percentage = ((campaign.currentKg / campaign.targetKg) * 100).toFixed(0);
            const remaining = campaign.targetKg - campaign.currentKg;
            const completed =
              campaign.status === "completed" || campaign.currentKg >= campaign.targetKg;

            return (
              <div
                key={campaign._id}
                className="group relative bg-white dark:bg-stone-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-amber-100 dark:border-stone-800"
              >
                <div className="h-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

                <div className="absolute top-6 right-4 z-10">
                  <DeleteCampaignButton
                    campaignId={campaign._id}
                    fruitName={campaign.fruitName}
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center pr-2">
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                      🥭 {campaign.fruitName}
                    </h2>
                  </div>

                  <div className="mt-2">
                    {completed ? (
                      <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 px-3 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-lg font-semibold text-orange-600 dark:text-orange-400">
                    ₹{campaign.pricePerKg}/kg
                  </p>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2 text-stone-600 dark:text-stone-300">
                      <span>Progress</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-4 bg-gradient-to-r from-amber-500 to-rose-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Current</p>
                      <p className="font-bold text-stone-900 dark:text-white">{campaign.currentKg}kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Target</p>
                      <p className="font-bold text-stone-900 dark:text-white">{campaign.targetKg}kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Left</p>
                      <p className="font-bold text-stone-900 dark:text-white">{remaining}kg</p>
                    </div>
                  </div>

                  
                    href={`/campaign/${campaign._id}`}
                    className="block mt-6 text-center bg-gradient-to-r from-amber-600 to-rose-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-opacity"
                  >
                    View Campaign
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {campaigns.length === 0 && (
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-10 text-center mt-8 border border-amber-100 dark:border-stone-800">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">No Active Campaigns</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-2">Ask admin to create one.</p>
          </div>
        )}
      </div>
    </main>
  );
}