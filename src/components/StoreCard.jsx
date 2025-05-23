export default function StoreCard({ store }) {
  return (
    <div
      key={store.id}
      onClick={() => (window.location.href = `/toko/${store.id}`)}
      className="border rounded-lg p-4 bg-white shadow hover:shadow-md"
    >
      <h3 className="text-xl font-semibold text-[#de8b27]">{store.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{store.address}</p>
      <p className="text-gray-400 text-xs mt-2">Pemilik: {store.owner?.name}</p>
    </div>
  );
}
