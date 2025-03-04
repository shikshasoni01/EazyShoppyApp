import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 ">
              <h2>About Eazy Shoppy</h2>
              <p>
                Welcome to <strong>Eazy Shoppy</strong> – your one-stop
                destination for effortless shopping. With a commitment to
                quality, affordability, and seamless service, we aim to
                revolutionize the way you shop online.
              </p>
            </div>
            <div className="col-md-6 ">
              <img
                src="https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                alt="About Eazy Shoppy"
                className="responsive-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 ">
              <img
                src="https://images.pexels.com/photos/7310206/pexels-photo-7310206.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Why Choose Us"
                className="responsive-image"
              />
            </div>
            <div className="col-md-6">
              <h2>Why Choose Us?</h2>
              <ul>
                <li>High-quality products at unbeatable prices</li>
                <li>Fast and secure delivery</li>
                <li>24/7 customer support</li>
                <li>Exciting discounts and exclusive offers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="privacy-policy">
        <div className="container">
          <h2>Privacy Policy</h2>
          <p>
            Your privacy is our priority. We ensure that your personal data
            remains safe, secure, and confidential. Learn more by visiting our{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <h2>Contact Us</h2>
              <p>We’re here to help! Reach out to us anytime:</p>
              <ul>
                <li>
                  <strong>Email:</strong> support@eazyshoppy.com
                </li>
                <li>
                  <strong>Phone:</strong> +91-9876543210
                </li>
                <li>
                  <strong>Address:</strong> 123, Eazy Lane, Pune, India
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Contact Us"
                className="responsive-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <blockquote>
              {
                '"Eazy Shoppy made my shopping easy and stress-free. I love their fast service!"'
              }
              <footer>- Vaishnavi Nalawade</footer>
            </blockquote>
            <blockquote>
              {
                '"Great discounts and excellent product quality. Highly recommended!"'
              }
              <footer>- Kajal Pawar</footer>
            </blockquote>
            <blockquote>
              {
                '"Amazing customer service! They responded quickly to all my queries."'
              }
              <footer>- Shiksha Soni</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
