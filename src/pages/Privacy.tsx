import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assetPath, getAssetPublicUrl, loadStaticPage } from "../lib/supabase";
import "@/styles/privacy.css";

type PrivacySection = {
  id: string;
  title: string;
  content?: string;
};

export default function Privacy() {
  const [sections, setSections] = useState<PrivacySection[]>([]);
  const [pageBody, setPageBody] = useState("");

  const bannerImage = getAssetPublicUrl(assetPath("single-banner.jpg"));

  useEffect(() => {
    let mounted = true;
    (async () => {
      const page = await loadStaticPage("privacy");
      if (!mounted || !page || !Array.isArray(page.sections)) return;

      setPageBody(page.body || "");

      const mapped = page.sections
        .map((s, idx) => ({
          id: s.id || `item-${idx + 1}`,
          title: s.title || `Section ${idx + 1}`,
          content: s.content || "",
        }))
        .filter((s) => s.title);
      setSections(mapped);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: `url(${bannerImage}) no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>privacy policy</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              privacy
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section privacy-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <nav className="nav nav-pills flex-column" id="scrollspy">
                {sections.length === 0 && (
                  <span>No privacy sections available.</span>
                )}
                {sections.map((section) => (
                  <a
                    className="nav-link"
                    href={`#${section.id}`}
                    key={section.id}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
            <div className="col-lg-9">
              <div
                className="scrollspy"
                data-bs-spy="scroll"
                data-bs-target="#scrollspy"
                data-bs-offset="0"
                tabIndex={0}
              >
                {sections.map((section) => (
                  <div
                    className="scrollspy-content"
                    id={section.id}
                    key={section.id}
                  >
                    <h3>{section.title}</h3>
                    <p>{section.content || pageBody}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
