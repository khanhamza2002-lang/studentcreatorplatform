import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

function ProductCard({
  id,
  title,
  type,
  price,
  seller,
  image,
  sold,
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      <div className="relative overflow-hidden">

        <img
          src={
            image
              ? `http://localhost:5000${image}`
              : "https://placehold.co/600x400"
          }
          alt={title}
          className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
        />

        {sold && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full font-semibold shadow-lg">
            SOLD
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {type}
        </div>

      </div>

      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Sold by <span className="font-semibold">{seller}</span>
        </p>

        <div className="flex items-center justify-between">

          <span className="text-2xl font-bold text-blue-700">
            PKR {price}
          </span>

          <Link to={`/product/${id}`}>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
              <Eye size={18} />
              View
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;