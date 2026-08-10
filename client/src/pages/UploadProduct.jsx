import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  ImagePlus,
  PackagePlus,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/Navbar";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function UploadProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!title || !description || !price || !category) {
      alert("Please complete all required fields.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          "Product uploaded successfully! It will appear publicly after admin approval."
        );

        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage(null);

        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">

          <div className="max-w-6xl mx-auto px-6 md:px-8 py-14">

            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white font-semibold mb-8"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>

            <span className="text-blue-300 text-xs font-extrabold tracking-[0.2em]">
              CREATE A LISTING
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
              Showcase something you've created.
            </h1>

            <p className="text-slate-300 text-lg mt-4 max-w-2xl leading-8">
              Add your product details, choose a category and upload an image.
              Your listing will be reviewed before becoming public.
            </p>

          </div>

        </section>


        <section className="max-w-6xl mx-auto px-6 md:px-8 py-10">

          <div className="grid lg:grid-cols-[1fr_320px] gap-7">

            {/* FORM */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-7 md:p-9">

              <div className="flex items-center gap-3 mb-7">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <PackagePlus size={23} />
                </div>

                <div>

                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Product information
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Provide clear details for potential buyers.
                  </p>

                </div>

              </div>


              <div className="space-y-6">

                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Product Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Handmade Leather Notebook"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Description
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Describe your product, condition, features or what makes it useful..."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    className="w-full resize-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Price (PKR)
                    </label>

                    <input
                      type="number"
                      placeholder="2500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>


                  <div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Category
                    </label>

                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select Category</option>
                      <option value="Software">Software</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Notes">Notes</option>
                      <option value="Photography">Photography</option>
                      <option value="Art & Design">Art & Design</option>
                      <option value="Handmade Crafts">Handmade Crafts</option>
                      <option value="Electronics">Electronics</option>
                    </select>

                  </div>

                </div>


                {/* IMAGE */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Product Image
                  </label>

                  <label className="group flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 rounded-2xl p-8 cursor-pointer transition">

                    <div className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm">
                      <ImagePlus size={25} />
                    </div>

                    <p className="font-bold text-slate-700 mt-4">
                      {image ? image.name : "Choose an image"}
                    </p>

                    <p className="text-slate-400 text-sm mt-1">
                      JPG, PNG or other supported image format
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImage(e.target.files[0])
                      }
                      className="hidden"
                    />

                  </label>

                </div>


                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-md shadow-blue-100 transition"
                >
                  <Upload size={20} />

                  {submitting
                    ? "Uploading..."
                    : "Submit Product"}
                </button>

              </div>

            </div>


            {/* SIDE INFO */}
            <aside className="space-y-5">

              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">

                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck size={23} />
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg mt-5">
                  Moderated listings
                </h3>

                <p className="text-slate-500 text-sm leading-7 mt-2">
                  New products remain pending until an administrator reviews
                  and approves them.
                </p>

              </div>


              <div className="bg-blue-950 text-white rounded-3xl p-6">

                <h3 className="font-extrabold text-lg">
                  Tips for a better listing
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-blue-100 leading-6">
                  <li>• Use a clear product title.</li>
                  <li>• Upload a good-quality image.</li>
                  <li>• Describe the product honestly.</li>
                  <li>• Choose the correct category.</li>
                  <li>• Set a realistic student-friendly price.</li>
                </ul>

              </div>

            </aside>

          </div>

        </section>

      </main>
    </>
  );
}

export default UploadProduct;