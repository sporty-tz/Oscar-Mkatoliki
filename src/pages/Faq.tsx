import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assetPath, getAssetPublicUrl, loadFaqs } from "../lib/supabase";
import "@/styles/faq.css";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [faqs, setFaqs] = useState<Array<{ q: string; a: string }>>([]);

  const bannerImage = getAssetPublicUrl(assetPath("single-banner.jpg"));

  useEffect(() => {
    let mounted = true;
    (async () => {
      const rows = await loadFaqs();
      if (!mounted) return;
      setFaqs(rows.map((r) => ({ q: r.question, a: r.answer })));
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
          <h2>need help?</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              faq
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section faq-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="faq-parent">
                {faqs.length === 0 && <p>No FAQ items available yet.</p>}
                {faqs.map((faq, i) => (
                  <div className="faq-child" key={i}>
                    <div className="faq-que">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        aria-expanded={openIndex === i}
                      >
                        {faq.q}
                      </button>
                    </div>
                    {openIndex === i && (
                      <div className="faq-ans">
                        <p>{faq.a}</p>
                      </div>
                    )}
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
