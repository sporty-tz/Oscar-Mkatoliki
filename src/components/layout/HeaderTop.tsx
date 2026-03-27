import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSettings } from "../../context/useAppSettings";

type TopSelectOption = {
  label: string;
  value: string;
};

interface TopSelectProps {
  icon: string;
  options: TopSelectOption[];
  value: string;
  onChange: (value: string) => void;
}

function TopSelect({ icon, options, value, onChange }: TopSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? options[0].label;

  return (
    <div
      className={`header-select${open ? " open" : ""}`}
      ref={wrapperRef}
      data-settings-lock="true"
    >
      <i className={icon}></i>
      <button
        className="header-select-toggle"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {selectedLabel}
      </button>
      <ul className="header-select-menu">
        {options.map((option) => (
          <li key={option.value}>
            <button
              className={`header-select-option${
                option.value === value ? " active" : ""
              }`}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeaderTop() {
  const { language, setLanguage, currency, setCurrency } = useAppSettings();

  return (
    <div className="header-top">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-5">
            <div className="header-top-welcome">
              <p>Welcome to Oscalius, Your Catholic Online Store!</p>
            </div>
          </div>
          <div className="col-md-5 col-lg-3">
            <div className="header-top-select">
              <TopSelect
                icon="icofont-world"
                options={[
                  { label: "English", value: "english" },
                  { label: "Swahili", value: "swahili" },
                  { label: "French", value: "french" },
                ]}
                value={language}
                onChange={(value) =>
                  setLanguage(value as "english" | "swahili" | "french")
                }
              />
              <TopSelect
                icon="icofont-money"
                options={[
                  { label: "TSH", value: "tsh" },
                  { label: "USD", value: "usd" },
                  { label: "GBP", value: "gbp" },
                ]}
                value={currency}
                onChange={(value) =>
                  setCurrency(value as "tsh" | "usd" | "gbp")
                }
              />
            </div>
          </div>
          <div className="col-md-7 col-lg-4">
            <ul className="header-top-list">
              <li>
                <Link to="/offer">offers</Link>
              </li>
              <li>
                <Link to="/faq">need help</Link>
              </li>
              <li>
                <Link to="/contact">contact us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
