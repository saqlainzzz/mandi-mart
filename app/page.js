

async function getCampaigns() {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns`,
  {
    cache: "no-store",
  }
);

  return res.json();
}

export default async function Home() {
  const campaigns =
    await getCampaigns();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 transition-all">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-xl">

        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-black">
              🛒 Mandi Mart
            </h1>

            <p className="mt-2 text-green-100">
              Community Bulk Buying Platform
            </p>
          </div>

        

        </div>

      </div>

      {/* Stats Banner */}

      <div className="max-w-6xl mx-auto px-6 mt-8">

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Active Campaigns
            </p>

            <p className="text-3xl font-bold">
              {campaigns.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Community Driven
            </p>

            <p className="text-3xl font-bold">
              🤝
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Transparency
            </p>

            <p className="text-3xl font-bold">
              100%
            </p>
          </div>

        </div>

      </div>

      {/* Campaigns */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {campaigns.map(
            (campaign) => {
              const percentage =
                (
                  (campaign.currentKg /
                    campaign.targetKg) *
                  100
                ).toFixed(0);

              const remaining =
                campaign.targetKg -
                campaign.currentKg;

              const completed =
                campaign.status ===
                  "completed" ||
                campaign.currentKg >=
                  campaign.targetKg;

              return (
                <div
                  key={campaign._id}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
                >

                  <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500" />

                  <div className="p-6">

                    <div className="flex justify-between items-center">

                      <h2 className="text-2xl font-bold dark:text-white">
                        🥭{" "}
                        {
                          campaign.fruitName
                        }
                      </h2>

                      {completed ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      )}

                    </div>

                    <p className="mt-3 text-lg font-semibold text-green-600">
                      ₹
                      {
                        campaign.pricePerKg
                      }
                      /kg
                    </p>

                    <div className="mt-6">

                      <div className="flex justify-between text-sm mb-2 dark:text-gray-300">
                        <span>
                          Progress
                        </span>

                        <span>
                          {
                            percentage
                          }
                          %
                        </span>
                      </div>

                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">

                        <div
                          className="h-4 bg-gradient-to-r from-green-500 to-blue-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-6 text-center">

                      <div>
                        <p className="text-xs text-gray-500">
                          Current
                        </p>

                        <p className="font-bold dark:text-white">
                          {
                            campaign.currentKg
                          }
                          kg
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Target
                        </p>

                        <p className="font-bold dark:text-white">
                          {
                            campaign.targetKg
                          }
                          kg
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Left
                        </p>

                        <p className="font-bold dark:text-white">
                          {
                            remaining
                          }
                          kg
                        </p>
                      </div>

                    </div>

                    <a
                      href={`/campaign/${campaign._id}`}
                      className="block mt-6 text-center bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold"
                    >
                      View Campaign
                    </a>

                  </div>

                </div>
              );
            }
          )}

        </div>

        {campaigns.length ===
          0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center mt-8">
            <h2 className="text-2xl font-bold dark:text-white">
              No Active Campaigns
            </h2>

            <p className="text-gray-500 mt-2">
              Ask admin to create one.
            </p>
          </div>
        )}

      </div>

    </main>
  );
}