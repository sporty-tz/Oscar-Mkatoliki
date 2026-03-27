import { useState } from "react";

interface CategorySidebarProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  {
    icon: "flaticon-vegetable",
    name: "vegetables",
    items: ["asparagus", "broccoli", "carrot"],
  },
  {
    icon: "flaticon-groceries",
    name: "groceries",
    items: ["Grains & Bread", "Dairy & Eggs", "Oil & Fat"],
  },
  {
    icon: "flaticon-fruit",
    name: "fruits",
    items: ["Apple", "Orange", "Strawberry"],
  },
  {
    icon: "flaticon-dairy-products",
    name: "dairy farm",
    items: ["Egg", "milk", "butter"],
  },
  {
    icon: "flaticon-crab",
    name: "sea foods",
    items: ["Lobster", "Octopus", "Shrimp"],
  },
  {
    icon: "flaticon-salad",
    name: "diet foods",
    items: ["Salmon", "Potatoes", "Greens"],
  },
  {
    icon: "flaticon-dried-fruit",
    name: "dry foods",
    items: ["noodles", "Powdered milk", "nut & yeast"],
  },
  {
    icon: "flaticon-fast-food",
    name: "fast foods",
    items: ["burger", "sandwich", "pizza"],
  },
  {
    icon: "flaticon-cheers",
    name: "drinks",
    items: ["Wine", "Juice", "Water"],
  },
  {
    icon: "flaticon-beverage",
    name: "coffee",
    items: ["Cappuchino", "Espresso", "Latte"],
  },
  {
    icon: "flaticon-barbecue",
    name: "meats",
    items: ["Meatball", "Sausage", "Poultry"],
  },
  {
    icon: "flaticon-fish",
    name: "fishes",
    items: ["Agujjim", "saltfish", "pazza"],
  },
];

export default function CategorySidebar({
  open,
  onClose,
}: CategorySidebarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <aside className={`category-sidebar${open ? " active" : ""}`}>
      <div className="category-header">
        <h4 className="category-title">
          <i className="fas fa-align-left"></i>
          <span>categories</span>
        </h4>
        <button className="category-close" onClick={onClose}>
          <i className="icofont-close"></i>
        </button>
      </div>
      <ul className="category-list">
        {categories.map((cat, i) => (
          <li className="category-item" key={cat.name}>
            <a
              className={`category-link dropdown-link${openIndex === i ? " active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenIndex(openIndex === i ? null : i);
              }}
            >
              <i className={cat.icon}></i>
              <span>{cat.name}</span>
            </a>
            <ul
              className="dropdown-list"
              style={{ display: openIndex === i ? "block" : "none" }}
            >
              {cat.items.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="category-footer">
        <p>
          All Rights Reserved by <a href="#">Oscar Mkatoliki</a>
        </p>
      </div>
    </aside>
  );
}
