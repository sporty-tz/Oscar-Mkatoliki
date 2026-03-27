const features = [
  {
    icon: "fas fa-truck",
    title: "free home delivery",
    desc: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
  },
  {
    icon: "fas fa-sync-alt",
    title: "instant return policy",
    desc: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
  },
  {
    icon: "fas fa-headset",
    title: "quick support system",
    desc: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
  },
  {
    icon: "fas fa-lock",
    title: "secure payment way",
    desc: "Lorem ipsum dolor sit amet adipisicing elit nobis.",
  },
];

export default function Intro() {
  return (
    <section className="intro-part">
      <div className="container">
        <div className="row intro-content">
          {features.map((f) => (
            <div className="col-sm-6 col-lg-3" key={f.title}>
              <div className="intro-wrap">
                <div className="intro-icon">
                  <i className={f.icon}></i>
                </div>
                <div className="intro-content">
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
