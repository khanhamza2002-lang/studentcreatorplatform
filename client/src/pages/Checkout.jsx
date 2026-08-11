import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [product, setProduct] = useState(null);

  const [customerName, setCustomerName] = useState(
    user.full_name || ""
  );

  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
      } else {
        alert(data.message || "Product not found.");
        navigate("/products");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load product.");
    }
  };

  const placeOrder = async () => {
    if (
      !customerName.trim() ||
      !phone.trim() ||
      !deliveryAddress.trim() ||
      !city.trim() ||
      !paymentMethod
    ) {
      alert("Please complete all checkout details.");
      return;
    }

    if (product?.sold) {
      alert("This product has already been sold.");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await fetch(
        `${API_URL}/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            product_id: product.id,
            customer_name: customerName,
            phone,
            delivery_address: deliveryAddress,
            city,
            payment_method: paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          "Order placed successfully! The seller can now begin processing your order."
        );

        navigate("/my-orders");
      } else {
        alert(data.message || "Unable to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>

          <p className="text-slate-500 mt-5 font-semibold">
            Preparing checkout...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">

          <span className="text-blue-600 text-xs font-extrabold tracking-[0.18em]">
            SECURE CHECKOUT
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2">
            Place Your Order
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Enter your delivery information and confirm your purchase.
          </p>

        </div>


        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* CUSTOMER DETAILS */}

          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-7 md:p-9">

            <div className="flex items-center gap-3 mb-8">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Delivery Details
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Tell the seller where the order should be delivered.
                </p>
              </div>

            </div>


            <div className="grid md:grid-cols-2 gap-5">

              <CheckoutField
                label="Customer Name"
                icon={User}
              >
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Full name"
                  className="w-full outline-none bg-transparent"
                />
              </CheckoutField>


              <CheckoutField
                label="Phone Number"
                icon={Phone}
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="03XX XXXXXXX"
                  className="w-full outline-none bg-transparent"
                />
              </CheckoutField>

            </div>


            <div className="mt-5">

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Delivery Address
              </label>

              <textarea
                value={deliveryAddress}
                onChange={(e) =>
                  setDeliveryAddress(e.target.value)
                }
                placeholder="House / apartment, street, area..."
                rows="4"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition resize-none"
              />

            </div>


            <div className="mt-5">

              <label className="block text-sm font-bold text-slate-700 mb-2">
                City
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                placeholder="e.g. Karachi"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
              />

            </div>


            {/* PAYMENT */}

            <div className="border-t border-slate-200 mt-9 pt-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CreditCard size={21} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Select how you would like to pay.
                  </p>
                </div>

              </div>


              <div className="grid md:grid-cols-2 gap-4">

                <PaymentOption
                  title="Cash on Delivery"
                  description="Pay when your order is delivered."
                  selected={
                    paymentMethod === "Cash on Delivery"
                  }
                  onClick={() =>
                    setPaymentMethod("Cash on Delivery")
                  }
                />

                <PaymentOption
                  title="Bank Transfer"
                  description="Arrange payment directly with the seller."
                  selected={
                    paymentMethod === "Bank Transfer"
                  }
                  onClick={() =>
                    setPaymentMethod("Bank Transfer")
                  }
                />

              </div>

            </div>

          </section>


          {/* ORDER SUMMARY */}

          <aside className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden lg:sticky lg:top-6">

            <div className="p-6 border-b border-slate-100">

              <div className="flex items-center gap-2">

                <ShoppingBag
                  size={20}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-extrabold text-slate-900">
                  Order Summary
                </h2>

              </div>

            </div>


            <img
              src={
                product.image_url
                  ? `${API_URL}${product.image_url}`
                  : "https://placehold.co/600x400"
              }
              alt={product.title}
              className="w-full h-56 object-cover"
            />


            <div className="p-6">

              <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                {product.category}
              </span>

              <h3 className="text-2xl font-extrabold text-slate-900 mt-4">
                {product.title}
              </h3>

              <p className="text-slate-500 mt-2">
                Sold by{" "}
                <span className="font-bold text-slate-700">
                  {product.full_name}
                </span>
              </p>


              <div className="border-t border-slate-200 mt-6 pt-6">

                <div className="flex justify-between text-slate-500">
                  <span>Product Price</span>

                  <span>
                    PKR {product.price}
                  </span>
                </div>


                <div className="flex justify-between items-center mt-5">

                  <span className="font-bold text-slate-900">
                    Total
                  </span>

                  <span className="text-3xl font-extrabold text-blue-700">
                    PKR {product.price}
                  </span>

                </div>

              </div>


              <button
                onClick={placeOrder}
                disabled={placingOrder || product.sold}
                className="w-full mt-7 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-extrabold py-4 rounded-xl transition shadow-lg shadow-blue-100"
              >
                {product.sold
                  ? "Product Already Sold"
                  : placingOrder
                  ? "Placing Order..."
                  : "Confirm & Place Order"}
              </button>


              <div className="flex items-start gap-2 mt-5 text-sm text-slate-500">

                <ShieldCheck
                  size={18}
                  className="text-emerald-600 flex-shrink-0 mt-0.5"
                />

                <p>
                  Your order details will be sent to the seller
                  so they can begin processing your purchase.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}


function CheckoutField({
  label,
  icon: Icon,
  children,
}) {
  return (
    <div>

      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </label>

      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition">

        <Icon
          size={19}
          className="text-slate-400 flex-shrink-0"
        />

        {children}

      </div>

    </div>
  );
}


function PaymentOption({
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left border-2 rounded-2xl p-5 transition ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 hover:border-blue-300 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">

        <h3 className="font-extrabold text-slate-900">
          {title}
        </h3>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected
              ? "border-blue-600"
              : "border-slate-300"
          }`}
        >
          {selected && (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          )}
        </div>

      </div>

      <p className="text-sm text-slate-500 mt-2 leading-6">
        {description}
      </p>

    </button>
  );
}

export default Checkout;