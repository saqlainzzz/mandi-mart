async function getOrders(campaignId) {
  try {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${campaignId}`,
  {
    cache: "no-store",
  }
);

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function OrdersList({
  campaignId,
}) {
  const orders = await getOrders(campaignId);

  const totalOrders = orders.length;

  const totalKg = orders.reduce(
    (sum, order) =>
      sum + Number(order.quantityKg),
    0
  );

  return (
    <div className="mt-10 border-t pt-6">

      <h2 className="text-2xl font-bold mb-4">
        Community Orders
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">
            Total Orders
          </p>

          <p className="text-2xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">
            Total Quantity
          </p>

          <p className="text-2xl font-bold text-green-600">
            {totalKg}kg
          </p>
        </div>

      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3">

          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {order.name}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="font-bold text-green-700">
                {order.quantityKg}kg
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}