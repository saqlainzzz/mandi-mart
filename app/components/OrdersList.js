async function getOrders(campaignId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${campaignId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function OrdersList({ campaignId }) {
  const orders = await getOrders(campaignId);
  const totalOrders = orders.length;
  const totalKg = orders.reduce((sum, order) => sum + Number(order.quantityKg), 0);

  return (
    <div className="mt-10 border-t border-amber-100 dark:border-stone-800 pt-6">
      <h2 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Community Orders</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-amber-100 dark:border-stone-800 rounded-lg p-4">
          <p className="text-stone-500 dark:text-stone-400">Total Orders</p>
          <p className="text-2xl font-bold text-stone-900 dark:text-white">{totalOrders}</p>
        </div>
        <div className="border border-amber-100 dark:border-stone-800 rounded-lg p-4">
          <p className="text-stone-500 dark:text-stone-400">Total Quantity</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totalKg}kg</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-amber-50 dark:bg-stone-800/50 p-4 rounded-lg text-stone-600 dark:text-stone-400">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-amber-100 dark:border-stone-800 rounded-lg p-4 flex justify-between bg-white dark:bg-stone-900"
            >
              <div>
                <p className="font-semibold text-stone-900 dark:text-white">{order.name}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="font-bold text-orange-600 dark:text-orange-400">
                {order.quantityKg}kg
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}