// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';
// const Register = () => {
//   const navigate = useNavigate();
//   const [gender, setGender] = useState("male");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // Generate the avatar URL dynamically based on current state
//   const avatarUrl = gender === "male"
//     ? `https://avatar.iran.liara.run/public/boy?username=${formData.username || 'user'}`
//     : `https://avatar.iran.liara.run/public/girl?username=${formData.username || 'user'}`;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // --- તમારો નવો સુધારેલો API કોડ અહીં એડ કર્યો છે ---
//   const handleRegister = async (e) => {
//     e.preventDefault();
    
//     // બેઝિક વેલિડેશન
//     if (!formData.username || !formData.password) {
//       return alert("Required fields missing: Username and Password are required.");
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password,
//           email: formData.email,
//           image: avatarUrl,
//           gender: gender,
//           role: 'USER'
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert("Account Created! Please Login.");
//         navigate('/login');
//       } else {
//         // બેકએન્ડમાંથી આવતી એરર (દા.ત. Email already exists)
//         alert(result.error || result.message || "Registration failed");
//       }
//     } catch (error) {
//       // આ એરર ત્યારે જ આવે જો સર્વર બંધ હોય અથવા કનેક્શન ન થતું હોય
//       alert("SERVER_OFFLINE: ટર્મિનલમાં તમારું Node.js સર્વર 'node server.js' ચાલુ કરો.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid vh-100 p-0 overflow-hidden">
//       <div className="row g-0 h-100">
//         {/* Left Side: Branding & Image */}
//         <div className="col-md-6 d-none d-md-flex bg-dark align-items-center justify-content-center position-relative">
//           <div className="position-absolute top-0 start-0 p-5">
//             <h2 className="text-white fw-bold tracking-widest">SHOE<span className="text-warning">VAULT</span></h2>
//           </div>
//           <div className="text-center z-1 p-5">
//             <img
//               src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800"
//               alt="Premium Sneaker"
//               className="img-fluid"
//               style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
//             />
//             <h1 className="text-white mt-5 display-4 fw-bold text-uppercase italic">Join_The_Vault.</h1>
//           </div>
//         </div>

//         {/* Right Side: Register Form */}
//         <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
//           <div className="p-5 w-100" style={{ maxWidth: '500px' }}>
//             <h2 className="fw-black italic text-uppercase mb-4">Create_Account</h2>

//             <form onSubmit={handleRegister}>
//               <div className="mb-3">
//                 <label className="form-label small fw-bold">USERNAME</label>
//                 <input
//                   name="username"
//                   type="text"
//                   className="form-control bg-light border-0 py-3"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label small fw-bold">EMAIL</label>
//                 <input
//                   name="email"
//                   type="email"
//                   className="form-control bg-light border-0 py-3"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label small fw-bold">PASSWORD</label>
//                 <input
//                   name="password"
//                   type="password"
//                   className="form-control bg-light border-0 py-3"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="form-label small fw-bold">GENDER (FOR AVATAR)</label>
//                 <select
//                   className="form-select bg-light border-0 py-3"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-dark w-100 py-3 fw-black italic"
//                 disabled={loading}
//               >
//                 {loading ? "INITIALIZING..." : "CREATE_VAULT_KEY"}
//               </button>
//             </form>

//             <div className="mt-4 text-center">
//               <span className="text-muted small">Already have an account? </span>
//               <Link to="/login" className="text-dark fw-bold small text-decoration-none">LOG_IN</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Generate the avatar URL dynamically based on current state
  const avatarUrl = gender === "male"
    ? `https://avatar.iran.liara.run/public/boy?username=${formData.username || 'user'}`
    : `https://avatar.iran.liara.run/public/girl?username=${formData.username || 'user'}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.username || !formData.password) {
      toast.error("Required fields missing: Username and Password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          image: avatarUrl,
          gender: gender,
          role: 'USER'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("VAULT_ACCOUNT_CREATED: Access Granted. Please Login.");
        navigate('/login');
      } else {
        // Handle backend errors (e.g., Email already exists)
        toast.error(result.error || result.message || "Registration failed");
      }
    } catch (error) {
      // Handle connection or server issues
      toast.error("SERVER_OFFLINE: Ensure your Node.js server is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden">
      <div className="row g-0 h-100">
        {/* Left Side: Branding & Image */}
        <div className="col-md-6 d-none d-md-flex bg-dark align-items-center justify-content-center position-relative">
          <div className="position-absolute top-0 start-0 p-5">
            <h2 className="text-white fw-bold tracking-widest">SHOE<span className="text-warning">VAULT</span></h2>
          </div>
          <div className="text-center z-1 p-5">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800"
              alt="Premium Sneaker"
              className="img-fluid"
              style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
            />
            <h1 className="text-white mt-5 display-4 fw-bold text-uppercase fst-italic">Join_The_Vault.</h1>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="p-5 w-100" style={{ maxWidth: '400px' }}>
            <h2 className="fw-bold fst-italic text-uppercase mb-4">Create_Account</h2>

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">USERNAME</label>
                <input
                  name="username"
                  type="text"
                  className="form-control bg-light border-0 py-3 rounded-3"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. shoelover_99"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">EMAIL</label>
                <input
                  name="email"
                  type="email"
                  className="form-control bg-light border-0 py-3 rounded-3"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">PASSWORD</label>
                <input
                  name="password"
                  type="password"
                  className="form-control bg-light border-0 py-3 rounded-3"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">GENDER (FOR AVATAR)</label>
                <select
                  className="form-select bg-light border-0 py-3 rounded-3"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 py-3 fw-bold fst-italic rounded-3 shadow-sm"
                disabled={loading}
              >
                {loading ? "INITIALIZING..." : "CREATE_VAULT_KEY"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/login" className="text-dark fw-bold small text-decoration-none">LOG_IN</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;