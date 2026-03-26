// import React, { useState } from 'react';

// import 'react-toastify/dist/ReactToastify.css';
// const Contact = () => {
//   const [status, setStatus] = useState("");
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("SENDING...");

//     try {
//       const response = await fetch('http://localhost:5000/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setStatus("SUCCESS: We have received your message!");
//         setFormData({ name: "", email: "", message: "" }); // ફોર્મ ખાલી કરો
//       } else {
//         setStatus(result.error || "Failed to send the message.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setStatus("SERVER_OFFLINE: Please ensure the backend server is running.");
//     }
    
//     setTimeout(() => setStatus(""), 5000);
//   };

//   return (
//     <div className="contact-page py-5 bg-light min-vh-100 d-flex align-items-center">
//       <div className="container">
//         <div className="text-center mb-5">
//           <h2 className="fw-bold fst-italic display-4 text-dark">GET IN TOUCH</h2>
//           <p className="text-muted text-uppercase ls-wide">Have a question? Drop us a line.</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-10">
//             <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
//               <div className="row g-0">
//                 {/* Contact Info Sidebar */}
//                 <div className="col-md-5 bg-dark text-white p-5 d-flex flex-column justify-content-center">
//                   <h4 className="fw-bold text-warning mb-4">CONTACT INFO</h4>
//                   <div className="mb-4">
//                     <h6 className="fw-bold mb-1 text-uppercase small text-secondary">📍 Location</h6>
//                     <p className="mb-0">Shoe Vault HQ, Jamnagar, Gujarat, India</p>
//                   </div>
//                   <div className="mb-4">
//                     <h6 className="fw-bold mb-1 text-uppercase small text-secondary">📧 Email</h6>
//                     <p className="mb-0">rathodhemanshu76@gmail.com</p>
//                   </div>
//                   <div className="mb-4">
//                     <h6 className="fw-bold mb-1 text-uppercase small text-secondary">📞 Phone</h6>
//                     <p className="mb-0">+91 9016183770</p>
//                   </div>
//                 </div>

//                 {/* Contact Form */}
//                 <div className="col-md-7 bg-white p-5">
//                   {status && (
//                     <div className={`alert ${status.includes("SUCCESS") ? "alert-success" : "alert-danger"} border-0 shadow-sm mb-4`} role="alert">
//                       {status}
//                     </div>
//                   )}
                  
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="name" className="fw-bold small text-uppercase mb-1">Full Name</label>
//                       <input 
//                         type="text" 
//                         name="name"
//                         className="form-control border-2 py-2" 
//                         placeholder="Enter Name" 
//                         value={formData.name}
//                         onChange={handleChange}
//                         required 
//                       />
//                     </div>
                    
//                     <div className="mb-3">
//                       <label htmlFor="email" className="fw-bold small text-uppercase mb-1">Email Address</label>
//                       <input 
//                         type="email" 
//                         name="email"
//                         className="form-control border-2 py-2" 
//                         placeholder="name@example.com" 
//                         value={formData.email}
//                         onChange={handleChange}
//                         required 
//                       />
//                     </div>
                    
//                     <div className="mb-4">
//                       <label htmlFor="message" className="fw-bold small text-uppercase mb-1">Message</label>
//                       <textarea 
//                         name="message"
//                         className="form-control border-2" 
//                         rows="4" 
//                         placeholder="How can we help?"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                       ></textarea>
//                     </div>
                    
//                     <button type="submit" className="btn btn-warning w-100 fw-bold fst-italic py-3 rounded-pill shadow-sm">
//                       SEND MESSAGE
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Added toast
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button during request

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("SUCCESS: We have received your message!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        toast.error(result.error || "Failed to send the message.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("SERVER_OFFLINE: Please ensure the backend server is running.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="contact-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold fst-italic display-4 text-dark">GET IN TOUCH</h2>
          <p className="text-muted text-uppercase ls-wide">Have a question? Drop us a line.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Contact Info Sidebar */}
                <div className="col-md-5 bg-dark text-white p-5 d-flex flex-column justify-content-center">
                  <h4 className="fw-bold text-warning mb-4">CONTACT INFO</h4>
                  <div className="mb-4">
                    <h6 className="fw-bold mb-1 text-uppercase small text-secondary">📍 Location</h6>
                    <p className="mb-0">Shoe Vault HQ, Jamnagar, Gujarat, India</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold mb-1 text-uppercase small text-secondary">📧 Email</h6>
                    <p className="mb-0">rathodhemanshu76@gmail.com</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold mb-1 text-uppercase small text-secondary">📞 Phone</h6>
                    <p className="mb-0">+91 9016183770</p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="col-md-7 bg-white p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="fw-bold small text-uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        className="form-control border-2 py-2" 
                        placeholder="Enter Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="fw-bold small text-uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control border-2 py-2" 
                        placeholder="name@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="fw-bold small text-uppercase mb-1">Message</label>
                      <textarea 
                        name="message"
                        className="form-control border-2" 
                        rows="4" 
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-warning w-100 fw-bold fst-italic py-3 rounded-pill shadow-sm"
                      disabled={loading}
                    >
                      {loading ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;