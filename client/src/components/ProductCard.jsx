import { Link } from "react-router-dom";
import {
  Eye,
  UserRound,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

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
    <article className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* IMAGE */}
      <div className="relative overflow-hidden bg-slate-100">

        <img
          src={
            image
              ? `https://extraordinary-embrace-production-5820.up.railway.app${image}`
              : "https://placehold.co/600x400"
          }
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-80" />

        {/* category */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <ShoppingBag size={13} />
            {type}
          </span>
        </div>

        {/* sold */}
        {sold && (
          <div className="absolute right-4 top-4">
            <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
              SOLD
            </span>
          </div>
        )}

      </div>


      {/* CONTENT */}
      <div className="p-5">

        {/* title */}
        <h3 className="text-xl font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition">
          {title}
        </h3>


        {/* seller */}
        <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">

          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserRound size={14} />
          </div>

          <span>
            Sold by{" "}
            <span className="font-semibold text-slate-700">
              {seller}
            </span>
          </span>

        </div>


        {/* divider */}
        <div className="border-t border-slate-100 my-5" />


        {/* bottom row */}
        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
              Price
            </p>

            <p className="text-2xl font-extrabold text-blue-700 mt-1">
              PKR {price}
            </p>
          </div>


          <Link to={`/product/${id}`}>

            <button className="group/button inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition">

              <Eye size={17} />

              View

              <ArrowUpRight
                size={15}
                className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />

            </button>

          </Link>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;