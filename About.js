

import React from 'react';

const About = () => {
  return (
    <div className="about-page bg-white min-vh-100">
      {/* Hero Section */}
      <div className="py-5 bg-dark text-white text-center">
        <h1 className="display-3 fw-bold fst-italic">OUR STORY</h1>
        <p className="lead text-warning fw-bold text-uppercase" style={{ letterSpacing: "2px" }}>
          More than just a store. It's a culture.
        </p>
      </div>

      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1000&auto=format&fit=crop" 
              className="img-fluid rounded-5 shadow-lg" 
              alt="Sneaker Culture" 
            />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold fst-italic mb-4">DEFINING THE SOLE OF GUJARAT</h2>
        <p className="text-muted fs-5">
  Founded in 2025, <strong>Shoe Vault</strong> was created with a clear goal — to provide high-quality, stylish, and comfortable footwear for everyday use across India. 
  We focus on offering a wide range of shoes that fit different needs, from casual wear to sports and special occasions.
</p>

<p className="text-muted fs-5">
  At Shoe Vault, we carefully select every product to ensure durability, comfort, and value for money. 
  Whether you're looking for daily wear sneakers, formal shoes, or trendy collections, our store brings you reliable options with a focus on quality and customer satisfaction.
</p>
            {/* <p className="text-muted fs-5">
              Founded in 2025, <strong>Shoe Vault</strong> started with a simple mission: to make authentic, limited-edition sneakers accessible to everyone in India. 
            </p>
            <p className="text-muted fs-5">
              We don't just sell shoes; we curate "Grails." From iconic Air Jordans to the latest Yeezy drops, every pair in our vault is 100% verified for authenticity by our expert team.
            </p> */}
            <div className="row mt-4 g-3">
              <div className="col-6">
                <h4 className="fw-bold mb-0">10k+</h4>
                <small className="text-muted fw-bold">Happy Customers</small>
              </div>
              <div className="col-6">
                <h4 className="fw-bold mb-0">100%</h4>
                <small className="text-muted fw-bold">Authenticity Guaranteed</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;