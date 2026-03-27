import { Link } from "react-router-dom";
import "@/styles/all-category.css";

export default function AllCategory() {
  const categories = [
    { icon: "flaticon-vegetable", name: "vegetables", count: 34 },
    { icon: "flaticon-groceries", name: "groceries", count: 45 },
    { icon: "flaticon-fruit", name: "fruits", count: 89 },
    { icon: "flaticon-dairy-products", name: "dairy farm", count: 83 },
    { icon: "flaticon-crab", name: "sea foods", count: 40 },
    { icon: "flaticon-salad", name: "diet foods", count: 57 },
    { icon: "flaticon-dried-fruit", name: "dry foods", count: 23 },
    { icon: "flaticon-fast-food", name: "fast foods", count: 97 },
    { icon: "flaticon-cheers", name: "drinks", count: 65 },
    { icon: "flaticon-beverage", name: "coffee", count: 30 },
    { icon: "flaticon-barbecue", name: "meats", count: 72 },
    { icon: "flaticon-fish", name: "fishes", count: 48 },
  ];

  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: "url(/images/single-banner.jpg) no-repeat center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>all categories</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              categories
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
            {categories.map((cat) => (
              <div className="col" key={cat.name}>
                <Link
                  className="suggest-card"
                  to="/shop"
                  style={{ marginBottom: "20px", display: "block" }}
                >
                  <div className="text-center" style={{ padding: "20px" }}>
                    <i
                      className={cat.icon}
                      style={{ fontSize: "48px", color: "var(--primary)" }}
                    ></i>
                    <h5 style={{ marginTop: "10px" }}>
                      {cat.name} <span>{cat.count} items</span>
                    </h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
