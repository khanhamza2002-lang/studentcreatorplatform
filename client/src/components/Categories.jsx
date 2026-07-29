import "./Categories.css";

function Categories() {
  return (
    <section className="categories">
      <h2>Browse Categories</h2>

      <div className="category-grid">
        <div className="category-card">💻 Software</div>
        <div className="category-card">🎨 Art & Design</div>
        <div className="category-card">👕 Fashion</div>
        <div className="category-card">📚 Notes</div>
        <div className="category-card">📸 Photography</div>
        <div className="category-card">🛠️ Handmade Crafts</div>
      </div>
    </section>
  );
}

export default Categories;