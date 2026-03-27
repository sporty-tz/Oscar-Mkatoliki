import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import "@/styles/brand-single.css";

export default function BrandSingle() {
  const { id } = useParams();
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: "fresh green chilis",
    image: `/images/product/${String(i + 1).padStart(2, "0")}.jpg`,
    price: 28,
    oldPrice: 34,
    unit: "piece",
    rating: 4,
    reviewCount: 3,
    labels: ["sale"] as string[],
  }));

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
          <h2>Brand {id}</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/brands">Brands</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Brand {id}
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {products.map((p) => (
              <div className="col" key={p.id}>
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
