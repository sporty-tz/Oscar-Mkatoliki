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
    {
      id: 2,
      image: "/images/testimonial/02.jpg",
      name: "miron mahmud",
      role: "Senior Accountant - farmfresh.com",
    },
  ];

  const chooseItems = [
    {
      id: 1,
      icon: "icofont-fruits",
      title: "100% fresh organic food",
    },
    {
      id: 2,
      icon: "icofont-vehicle-delivery-van",
      title: "Delivery within one hour",
    },
    {
      id: 3,
      icon: "icofont-loop",
      title: "quickly return policy",
    },
    {
      id: 4,
      icon: "icofont-support",
      title: "instant support team",
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
          <h2>about our company</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              about
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section about-company">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <h2>Our Motive is to Provide Best for Those Who Deserve</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis exercitationem commodi aliquam necessitatibus vero
                  reiciendis quaerat illo est fuga ea temporibus natus
                  doloremque ipsum voluptas quod deserunt expedita reprehenderit
                  pariatur quidem quisquam, recusandae animi non! Voluptas totam
                  repudiandae rerum molestiae possimus quis numquam sapiente
                  sunt architecto quisquam. Aliquam odio optio.
                </p>
              </div>
              <ul className="about-list">
                <li>
                  <h3>34785</h3>
                  <h6>registered users</h6>
                </li>
                <li>
                  <h3>2623</h3>
                  <h6>per day visitors</h6>
                </li>
                <li>
                  <h3>189</h3>
                  <h6>total products</h6>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      neque earum sapiente vitae obcaecati magnam doloribus
                      magni provident ab ipsam sint dolores repellat inventore
                      sequi temporibus natus.
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
                <h2>Why People Choose Their Daily Organic Life With Us</h2>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing tempora
                      pariatur provident animi error dignissimo cumque minus
                      facere dolores cupiditate debitis.
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
                  { image: "03", role: "graphics designer" },
                  { image: "04", role: "digital marketer" },
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
                        <a href="#">Jhonson Hononr</a>
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
