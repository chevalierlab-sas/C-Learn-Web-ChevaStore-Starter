import { apiUrl } from "../utils/baseRequest";
import { currencyFormatting } from "../utils/helper";

export default function ProductCard({ product, className }) {
  return (
    <div key={product.id} className={`${className} border rounded-lg p-4 bg-white shadow hover:shadow-md`}>
      <img src={`${apiUrl}/assets${product.image}`} alt={product.title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lg truncate">{product.title}</h3>
      <p className="text-sm text-gray-500 mb-1">{product.category?.name}</p>
      <p className="font-bold text-[#de8b27]">{currencyFormatting(product.price)}</p>
    </div>
  );
}
