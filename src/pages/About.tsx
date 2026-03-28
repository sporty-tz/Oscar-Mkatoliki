import { Link } from "react-router-dom";
import "@/styles/about.css";

export default function About() {
  const testimonialItems = [
    {
      id: 1,
      image: "/images/testimonial/01.jpg",
      name: "tahmina labonno",
      role: "Former MD - joomtech.com",
    },
  ];

  const chooseItems = [
    {
      id: 1,
      icon: "icofont-fruits",
      title: "100% Authentic Catholic Teachings",
    },
    {
      id: 2,
      icon: "icofont-vehicle-delivery-van",
      title: "Carefully Selected Sacramentals",
    },
    {
      id: 3,
      icon: "icofont-loop",
      title: "Secure & Trusted Experience",
    },
    {
      id: 4,
      icon: "icofont-support",
      title: "Faith-Centered Support",
    },
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
          <h2>About Oscar Mkatoliki </h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section about-company">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <h2>Our Mission Is to Serve Faith and Inspire Devotion</h2>
                <p>
                  We are a Catholic-centered platform dedicated to spreading the teachings 
                  of the Church while providing meaningful sacramentals and faith-based products.

                  Our mission is to help believers grow spiritually through access to prayer tools, 
                  devotionals, and resources rooted in tradition. Every item we offer is selected 
                  with care to support a deeper relationship with God and a more intentional Christian life.

                  Through this platform, we also extend our ministry beyond social media 
                  creating a space where faith, learning, and daily practice come together.
                </p>
              </div>
              <ul className="about-list">
                <li>
                  <h3>100,000</h3>
                  <h6>Faith Community Members</h6>
                </li>
                <li>
                  <h3>10,000</h3>
                  <h6>Daily Reach Across Platforms</h6>
                </li>
                <li>
                  <h3>50</h3>
                  <h6>Available Devotional Products</h6>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="about-img">
                <img src="/images/about/01.jpg" alt="about" />
                <img src="/images/about/02.jpg" alt="about" />
                <img src="/images/about/03.jpg" alt="about" />
                <img src="/images/about/04.jpg" alt="about" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-section about-testimonial">
        <div className="container">
          <ul className="testi-slider slider-arrow">
            {testimonialItems.map((item) => (
              <li key={item.id}>
                <div className="testi-content">
                  <a className="testi-img" href="#">
                    <img src={item.image} alt="testimonial" />
                  </a>
                  <div className="testi-quote">
                    <i className="icofont-quote-left"></i>
                    <p>
                      This platform has truly helped me stay consistent in my prayer life.
                       The teachings are clear, and the sacramentals remind me daily of my faith.
                    </p>
                    <h4>{item.name}</h4>
                    <h6>{item.role}</h6>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-choose">
        <div className="container">
          <div className="row">
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto">
              <div className="section-heading">
                <h2>Why Our Community Grows in Faith With Us</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {chooseItems.map((item) => (
              <div className="col-lg-6" key={item.id}>
                <div className="choose-card">
                  <div className="choose-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="choose-text">
                    <h4>{item.title}</h4>
                    <p>
                      Rooted in Scripture and Tradition, our content is created to guide and strengthen your faith journey..
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section about-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>our team members</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="team-slider team-flex-list">
                {[
                  { image: "01", role: "Founder & CEO" },
                  { image: "02", role: "Web developer" },
                ].map((member) => (
                  <li key={member.image}>
                    <figure className="team-media">
                      <img
                        src={`/images/team/${member.image}.jpg`}
                        alt="team"
                      />
                      <div className="team-overlay">
                        <a href="#" className="icofont-facebook facebook"></a>
                        <a href="#" className="icofont-twitter twitter"></a>
                        <a href="#" className="icofont-linkedin linkedin"></a>
                      </div>
                    </figure>
                    <div className="team-meta">
                      <h5>
                        <a href="#">Oscalius Nihongataile</a>
                      </h5>
                      <p>{member.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
