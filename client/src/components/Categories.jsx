import { useNavigate } from "react-router-dom";
import {
  Code2,
  Palette,
  Shirt,
  BookOpen,
  Camera,
  Hammer,
  Laptop,
  ArrowRight,
} from "lucide-react";

import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Software",
      description: "Apps, websites and digital tools",
      icon: Code2,
    },
    {
      name: "Art & Design",
      description: "Artwork, graphics and designs",
      icon: Palette,
    },
    {
      name: "Fashion",
      description: "Clothing and student fashion",
      icon: Shirt,
    },
    {
      name: "Notes",
      description: "Study material and academic notes",
      icon: BookOpen,
    },
    {
      name: "Photography",
      description: "Photography and visual content",
      icon: Camera,
    },
    {
      name: "Handmade Crafts",
      description: "Unique handmade creations",
      icon: Hammer,
    },
    {
      name: "Electronics",
      description: "Devices and tech accessories",
      icon: Laptop,
    },
  ];

  const openCategory = (category) => {
    navigate(
      `/products?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <section className="categories">
      <div className="section-heading">
        <span className="section-label">EXPLORE</span>

        <h2>Browse by category</h2>

        <p>
          Find exactly what you're looking for from student creators across
          different interests and skills.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className="category-card"
              onClick={() => openCategory(category.name)}
            >
              <div className="category-icon">
                <Icon size={27} />
              </div>

              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>

              <ArrowRight
                size={20}
                className="category-arrow"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;