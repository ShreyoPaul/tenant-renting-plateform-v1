import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #ece9f7;
    --card-bg: #f5f3fc;
    --white: #ffffff;
    --primary: #3a2f8b;
    --primary-light: #5a4fcf;
    --primary-btn: linear-gradient(135deg, #4b3fce 0%, #6c5ce7 100%);
    --accent-teal: #3ecfa3;
    --accent-teal-bg: #d0f5ea;
    --text-dark: #1e1a42;
    --text-mid: #5a5580;
    --text-light: #9390b0;
    --border: #dcdaf0;
    --input-bg: #edeaf8;
    --shadow: 0 8px 32px rgba(58,47,139,0.10);
    --radius: 14px;
    --radius-sm: 10px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text-dark);
  }

  .app-wrap {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 48px;
  }

  /* NAV */
  .navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 40px;
    background: transparent;
  }
  .navbar-brand {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 1.08rem;
    color: var(--text-dark);
    letter-spacing: -0.01em;
  }
  .avatar-icon {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: var(--input-bg);
    border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .avatar-icon:hover { border-color: var(--primary-light); }
  .avatar-icon svg { color: var(--text-mid); }

  /* MAIN CONTAINER */
  .main-container {
    width: 100%;
    max-width: 580px;
    padding: 0 16px;
  }

  /* PROGRESS */
  .progress-row {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 30px;
  }
  .progress-bar-wrap {
    flex: 1;
    height: 6px;
    background: #d9d5ef;
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    width: 66%;
    background: linear-gradient(90deg, #4b3fce, #6c5ce7);
    border-radius: 99px;
    transition: width 0.5s ease;
  }
  .progress-label {
    font-family: 'Sora', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-mid);
    white-space: nowrap;
  }

  /* HEADING */
  .page-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 6vw, 2.7rem);
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .page-subtitle {
    font-size: 0.95rem;
    color: var(--text-mid);
    line-height: 1.55;
    margin-bottom: 28px;
    max-width: 420px;
  }

  /* CARD */
  .card {
    background: var(--card-bg);
    border-radius: 20px;
    padding: 28px 28px 24px;
    box-shadow: var(--shadow);
    border: 1.5px solid rgba(220,218,240,0.7);
    margin-bottom: 20px;
  }

  /* AVATAR UPLOAD */
  .avatar-upload-row {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 26px;
    padding-bottom: 22px;
    border-bottom: 1.5px solid var(--border);
  }
  .avatar-box {
    width: 64px; height: 64px;
    border-radius: 16px;
    border: 2px dashed var(--primary-light);
    background: var(--input-bg);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .avatar-box:hover { border-color: var(--primary); background: #e4e0f7; }
  .avatar-box img {
    width: 100%; height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
  .avatar-box input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }
  .avatar-info h3 {
    font-family: 'Sora', sans-serif;
    font-size: 0.97rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 3px;
  }
  .avatar-info p {
    font-size: 0.83rem;
    color: var(--text-light);
  }

  /* FORM FIELDS */
  .field-group { margin-bottom: 18px; }
  .field-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 8px;
    font-family: 'Sora', sans-serif;
  }
  .field-input {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid transparent;
    border-radius: var(--radius-sm);
    padding: 13px 16px;
    font-size: 0.93rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    -webkit-appearance: none;
  }
  .field-input::placeholder { color: var(--text-light); }
  .field-input:focus {
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px rgba(108,92,231,0.12);
    background: #eae6f7;
  }

  /* INPUT WITH ICON */
  .input-icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .input-icon-wrap .icon {
    position: absolute;
    left: 14px;
    color: var(--text-light);
    display: flex;
    pointer-events: none;
  }
  .input-icon-wrap .field-input { padding-left: 40px; }

  /* TWO COL */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  /* SELECT */
  .select-wrap {
    position: relative;
  }
  .select-wrap select {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid transparent;
    border-radius: var(--radius-sm);
    padding: 13px 40px 13px 16px;
    font-size: 0.93rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-dark);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .select-wrap select:focus {
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px rgba(108,92,231,0.12);
    background: #eae6f7;
  }
  .select-wrap .chev {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-mid);
  }

  /* DATE INPUT */
  .date-wrap {
    position: relative;
  }
  .date-wrap input[type="date"] {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid transparent;
    border-radius: var(--radius-sm);
    padding: 13px 40px 13px 16px;
    font-size: 0.93rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-dark);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .date-wrap input[type="date"]:focus {
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px rgba(108,92,231,0.12);
    background: #eae6f7;
  }
  .date-wrap .cal-icon {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-light);
  }

  /* BUDGET SLIDER */
  .budget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }
  .budget-value {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--primary-light);
  }
  .slider-wrap { margin-bottom: 6px; }
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 99px;
    outline: none;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    height: 5px;
    border-radius: 99px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(58,47,139,0.25);
    cursor: pointer;
    margin-top: -8px;
    transition: box-shadow 0.2s;
  }
  input[type="range"]::-webkit-slider-thumb:hover {
    box-shadow: 0 2px 14px rgba(58,47,139,0.4);
  }
  input[type="range"]::-moz-range-thumb {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(58,47,139,0.25);
    cursor: pointer;
  }
  .slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-light);
    margin-top: 6px;
  }

  /* BUTTONS */
  .btn-primary {
    width: 100%;
    padding: 15px;
    border-radius: var(--radius);
    background: var(--primary-btn);
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 18px rgba(75,63,206,0.28);
    margin-top: 8px;
  }
  .btn-primary:hover { opacity: 0.93; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(75,63,206,0.32); }
  .btn-primary:active { transform: translateY(0); }

  .btn-skip {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 14px;
    font-size: 0.9rem;
    color: var(--text-mid);
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
    padding: 4px;
  }
  .btn-skip:hover { color: var(--primary); }

  /* VERIFIED BANNER */
  .verified-banner {
    background: linear-gradient(135deg, #2ecf9a 0%, #3ecfa3 50%, #4dd8b0 100%);
    border-radius: 18px;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    overflow: hidden;
    position: relative;
  }
  .verified-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .verified-shield {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .verified-text h4 {
    font-family: 'Sora', sans-serif;
    font-size: 0.97rem;
    font-weight: 700;
    color: #0e4d37;
    margin-bottom: 3px;
  }
  .verified-text p {
    font-size: 0.82rem;
    color: #1a6b51;
  }
  .verified-illus {
    width: 90px; height: 70px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
    background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
  }
  .verified-illus svg { width: 100%; height: 100%; }

  /* TOAST */
  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: var(--primary);
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 13px 28px;
    border-radius: 99px;
    box-shadow: 0 8px 24px rgba(58,47,139,0.3);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1000;
    white-space: nowrap;
  }
  .toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* RESPONSIVE */
  @media (max-width: 600px) {
    .navbar { padding: 14px 20px; }
    .card { padding: 20px 16px 18px; border-radius: 16px; }
    .two-col { grid-template-columns: 1fr; gap: 12px; }
    .page-title { margin-bottom: 8px; }
    .verified-banner { padding: 18px 16px; }
    .verified-illus { width: 70px; height: 56px; }
  }

  @media (max-width: 400px) {
    .verified-illus { display: none; }
  }
`;

export default function UserData() {
  const [budget, setBudget] = useState(1200);
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null); // actual file ✅
  const [form, setForm] = useState({
    fullName: "",
    university: "",
    profession: "",
    passoutYear: "2024",
    dob: "",
    phoneno: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [faceDetected, setFaceDetected] = useState(null);
  const [faceError, setFaceError] = useState("");
  const [faceLoading, setFaceLoading] = useState(false);
  const fileRef = useRef();

  const min = 200,
    max = 50000;
  const pct = ((budget - min) / (max - min)) * 100;
  const sliderBg = `linear-gradient(90deg, #4b3fce ${pct}%, #d9d5ef ${pct}%)`;
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUserRole(decoded.role);
    }
  }, []);
  const navigate = useNavigate();

  const handleCancel = () => {
    const confirmLeave = window.confirm("Discard all changes?");
    if (confirmLeave) {
      navigate("/collectuserdata");
    }
  };

  const detectFace = async (file) => {
    if (!file) return false;

    if (!window.faceapi) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load face detection library."));
        document.head.appendChild(script);
      });
    }

    const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights";

    if (!window._faceApiModelsLoaded) {
      await window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      window._faceApiModelsLoaded = true;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const detection = await window.faceapi.detectSingleFace(
            img,
            new window.faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 })
          );
          URL.revokeObjectURL(img.src);
          resolve(!!detection);
        } catch (err) {
          URL.revokeObjectURL(img.src);
          reject(err);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error("Unable to read image file."));
      };
      img.src = URL.createObjectURL(file);
    });
  };
  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!form.fullName.trim()) {
  //     newErrors.fullName = "Full name is required";
  //   }

  //   if (!form.university.trim()) {
  //     newErrors.university = "University name is required";
  //   }
  //    if (!form.profession.trim()) {
  //     newErrors.profession = "Profession name is required";
  //   }

  //   if (!form.passoutYear) {
  //     newErrors.passoutYear = "Passout year is required";
  //   }

  //   if (!form.dob) {
  //     newErrors.dob = "Date of birth is required";
  //   }

  //   if (!form.location.trim()) {
  //     newErrors.location = "Preferred location is required";
  //   }

  //   if (!budget || budget < 200) {
  //     newErrors.budget = "Budget must be at least 200";
  //   }

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };

  const validateForm = () => {
    const newErrors = {};

    // ✅ Common fields (both roles)
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!form.location.trim()) {
      newErrors.location = "Preferred location is required";
    }
    if (!form.phoneno.trim()) {
      newErrors.phoneno = "Phone No is required";
    }
    if (!form.profession.trim()) {
      newErrors.profession = "Profession is required";
    }

    if (avatarFile && faceDetected === false) {
      newErrors.avatar = "No face detected in the selected image.";
    }

    if (avatarFile && faceDetected === null) {
      newErrors.avatar = "Please wait while we verify the uploaded image.";
    }

    // 👨‍🎓 Student validation
    if (userRole === "student") {
      if (!form.university.trim()) {
        newErrors.university = "University name is required";
      }

      if (!form.passoutYear) {
        newErrors.passoutYear = "Passout year is required";
      }

      if (!budget || budget < 200) {
        newErrors.budget = "Budget must be at least 200";
      }
    }

    // 🏠 Owner validation
    // if (userRole === "owner") {
    //   if (!form.profession.trim()) {
    //     newErrors.profession = "Profession is required";
    //   }
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const saveProfile = async () => {
  //   if (!validateForm()) return;

  //   setLoading(true); // 🔥 start loading

  //   try {
  //     const token = localStorage.getItem("token");

  //     const formData = new FormData();

  //     formData.append("fullName", form.fullName);
  //     formData.append("universityName", form.university);
  //      formData.append("profession", form.profession);
  //     formData.append("passoutYear", form.passoutYear);
  //     formData.append("dob", form.dob);
  //     formData.append("budget", budget);
  //     formData.append("preferredLocation", form.location);

  //     if (avatarFile) {
  //       formData.append("profileImg", avatarFile);
  //     }

  //     const res = await fetch("http://localhost:5000/api/user/profile", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: formData
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setToast(true);

  //       setTimeout(() => {
  //         navigate("/");
  //       }, 1000);
  //     }

  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false); // 🔥 stop loading
  //   }
  // };

  const saveProfile = async () => {
    if (!validateForm()) {
      
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // ✅ Common fields
      formData.append("fullName", form.fullName);
      formData.append("dob", form.dob);
      formData.append("preferredLocation", form.location);
      if (avatarFile) {
        formData.append("profileImg", avatarFile);
      }
      formData.append("profession", form.profession);
      formData.append("phoneno", String(form.phoneno));

      // 👨‍🎓 Student fields
      if (userRole === "student") {
        formData.append("universityName", form.university);
        formData.append("passoutYear", form.passoutYear);
        formData.append("budget", budget);

      }

      // 🏠 Owner fields
      // if (userRole === "owner") {
      //   formData.append("profession", form.profession);
      // }

      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setToast(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/"), 1000);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    setFaceError("");
    setFaceDetected(null);
    setErrors((prev) => ({ ...prev, avatar: "" })); // Clear previous avatar error

    if (!file) return;

    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
    setFaceLoading(true);

    try {
      const hasFace = await detectFace(file);
      if (hasFace) {
        setFaceDetected(true);
        setFaceError("");
      } else {
        setFaceDetected(false);
        setFaceError("No face detected. Please upload a clear photo showing your face.");
      }
    } catch (error) {
      setFaceDetected(false);
      setFaceError(error.message || "Face detection failed. Please try a different image.");
    } finally {
      setFaceLoading(false);
    }
  };

  console.log("Final errors:", errors);
  // const handleSave = () => {
  //   setToast(true);
  //   setTimeout(() => setToast(false), 2800);
  // };

  const years = [];
  for (let y = 2020; y <= 2030; y++) years.push(y);

  return (
    <>
      <style>{styles}</style>
      {
        userRole === "owner" ? (<>
          {/* Avatar */}
          <div className="app-wrap">
            {/* NAV */}
            <nav className="navbar">
              <span className="navbar-brand">Academic Curator</span>
              <div className="avatar-icon">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
            </nav>

            <div className="main-container">
              {/* PROGRESS */}
              <div className="progress-row">
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" />
                </div>
                <span className="progress-label">Step 2 of 3</span>
              </div>

              {/* HEADING */}
              <h1 className="page-title">Curate Your Experience.</h1>
              <p className="page-subtitle">
                Personalize your profile to unlock verified housing listings and
                academic networking opportunities tailored to your student journey.
              </p>

              {/* FORM CARD */}
              <div className="card">
                {/* AVATAR */}
                <div className="avatar-upload-row">
                  <div
                    className="avatar-box"
                    onClick={() => fileRef.current.click()}
                  >
                    {avatar ? (
                      <img src={avatar} alt="avatar" />
                    ) : (
                      <svg
                        width="26"
                        height="26"
                        fill="none"
                        stroke="#9390b0"
                        strokeWidth="1.6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      onChange={handleAvatar}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                  <div className="avatar-info">
                    <h3>Profile Avatar</h3>
                    <p>Help others recognize you</p>
                  </div>
                </div>
                {faceLoading && (
                  <p style={{ color: "#5a4fcf", fontSize: 12, marginTop: 8 }}>
                    Checking uploaded avatar for a face...
                  </p>
                )}
                {!faceLoading && (errors.avatar || faceError) && (
                  <p style={{ color: "red", fontSize: 12, marginTop: 8 }}>
                    {errors.avatar || faceError}
                  </p>
                )}

                {/* FULL NAME */}
                <div className="field-group">
                  <label className="field-label">Full Name</label>
                  <input
                    className="field-input"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                  />

                  {errors.fullName && (
                    <p style={{ color: "red", fontSize: 12 }}>{errors.fullName}</p>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label">Profession</label>
                  <input
                    className="field-input"
                    placeholder="Enter your Profession"
                    value={form.profession}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, profession: e.target.value }))
                    }
                  />

                  {errors.profession && (
                    <p style={{ color: "red", fontSize: 12 }}>{errors.profession}</p>
                  )}
                </div>
                <div className="field-group">
                  <label className="field-label">Phone Number</label>
                  <input
                    className="field-input"
                    placeholder="Enter your phone number"
                    value={form.phoneno}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phoneno: e.target.value }))
                    }
                  />

                  {errors.phoneno && (
                    <p style={{ color: "red", fontSize: 12 }}>{errors.phoneno}</p>
                  )}
                </div>




                {/* PASSOUT YEAR + DOB */}
                <div className="two-col field-group">

                  <div>
                    <label className="field-label">Date of Birth</label>
                    <div className="date-wrap">
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, dob: e.target.value }))
                        }
                      />

                      <span className="cal-icon">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </span>
                      {errors.dob && (
                        <p style={{ color: "red", fontSize: 12 }}>{errors.dob}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* BUDGET SLIDER */}


                {/* LOCATION */}
                <div className="field-group">
                  <label className="field-label">Preferred Location</label>
                  <div className="input-icon-wrap">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <input
                      className="field-input"
                      placeholder="e.g. East Village, London"
                      value={form.location}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, location: e.target.value }))
                      }
                    />
                    {errors.location && (
                      <p style={{ color: "red", fontSize: 12 }}>{errors.location}</p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <button className="btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
                <button className="btn-skip" onClick={handleCancel}>Cancel</button>
              </div>

              {/* VERIFIED BANNER */}
              <div className="verified-banner">
                <div className="verified-left">
                  <div className="verified-shield">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="#0e4d37"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path
                        d="M9 12l2 2 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="verified-text">
                    <h4>Verified Identity</h4>
                    <p>Secure encryption for all student data.</p>
                  </div>
                </div>
                <div className="verified-illus">
                  <svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
                    {/* Two students illustration */}
                    {/* Student 1 */}
                    <circle cx="30" cy="20" r="11" fill="#f4a261" />
                    <rect
                      x="16"
                      y="32"
                      width="28"
                      height="28"
                      rx="8"
                      fill="#e76f51"
                    />
                    <rect
                      x="20"
                      y="36"
                      width="8"
                      height="14"
                      rx="3"
                      fill="#264653"
                    />
                    {/* Hair */}
                    <ellipse cx="30" cy="12" rx="11" ry="6" fill="#264653" />
                    {/* Student 2 */}
                    <circle cx="62" cy="20" r="11" fill="#e9c46a" />
                    <rect
                      x="48"
                      y="32"
                      width="28"
                      height="28"
                      rx="8"
                      fill="#2a9d8f"
                    />
                    <rect
                      x="64"
                      y="36"
                      width="8"
                      height="14"
                      rx="3"
                      fill="#264653"
                    />
                    {/* Hair */}
                    <path d="M51 16 Q62 6 73 16" fill="#6d4c41" stroke="none" />
                    <ellipse cx="62" cy="12" rx="11" ry="5" fill="#6d4c41" />
                    {/* Plant */}
                    <rect
                      x="38"
                      y="48"
                      width="14"
                      height="16"
                      rx="3"
                      fill="#264653"
                    />
                    <ellipse cx="45" cy="44" rx="9" ry="10" fill="#2a9d8f" />
                    <ellipse cx="40" cy="42" rx="6" ry="8" fill="#52b788" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>) : (<>
          <div className="app-wrap">
            {/* NAV */}
            <nav className="navbar">
              <span className="navbar-brand">Academic Curator</span>
              <div className="avatar-icon">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
            </nav>

            <div className="main-container">
              {/* PROGRESS */}
              <div className="progress-row">
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" />
                </div>
                <span className="progress-label">Step 2 of 3</span>
              </div>

              {/* HEADING */}
              <h1 className="page-title">Curate Your Experience.</h1>
              <p className="page-subtitle">
                Personalize your profile to unlock verified housing listings and
                academic networking opportunities tailored to your student journey.
              </p>

              {/* FORM CARD */}
              <div className="card">
                {/* AVATAR */}
                <div className="avatar-upload-row">
                  <div
                    className="avatar-box"
                    onClick={() => fileRef.current.click()}
                  >
                    {avatar ? (
                      <img src={avatar} alt="avatar" />
                    ) : (
                      <svg
                        width="26"
                        height="26"
                        fill="none"
                        stroke="#9390b0"
                        strokeWidth="1.6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      onChange={handleAvatar}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                  <div className="avatar-info">
                    <h3>Profile Avatar</h3>
                    <p>Help others recognize you</p>
                  </div>
                </div>
                {faceLoading && (
                  <p style={{ color: "#5a4fcf", fontSize: 12, marginTop: 8 }}>
                    Checking uploaded avatar for a face...
                  </p>
                )}
                {!faceLoading && (errors.avatar || faceError) && (
                  <p style={{ color: "red", fontSize: 12, marginTop: 8 }}>
                    {errors.avatar || faceError}
                  </p>
                )}

                {/* FULL NAME */}
                <div className="field-group">
                  <label className="field-label">Full Name</label>
                  <input
                    className="field-input"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                  />

                  {errors.fullName && (
                    <p style={{ color: "red", fontSize: 12 }}>{errors.fullName}</p>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label">Profession</label>
                  <input
                    className="field-input"
                    placeholder="Enter your Profession"
                    value={form.profession}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, profession: e.target.value }))
                    }
                  />

                  {errors.profession && (
                    <p style={{ color: "red", fontSize: 12 }}>{errors.profession}</p>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label">Phone Number</label>
                  <input
                    className="field-input"
                    placeholder="Enter your phone number"
                    value={form.phoneno}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phoneno: e.target.value }))
                    }
                  />

                  {errors.phoneno && (
                    <p style={{ color: "red", fontSize: 12 }}>{errors.phoneno}</p>
                  )}
                </div>

                {/* UNIVERSITY */}
                <div className="field-group">
                  <label className="field-label">University Name</label>
                  <div className="input-icon-wrap">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </span>
                    <input
                      className="field-input"
                      placeholder="Search for your institution"
                      value={form.university}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, university: e.target.value }))
                      }
                      required
                    />
                    {errors.university && (
                      <p style={{ color: "red", fontSize: 12 }}>{errors.university}</p>
                    )}
                  </div>
                </div>

                {/* PASSOUT YEAR + DOB */}
                <div className="two-col field-group">
                  <div>
                    <label className="field-label">Passout Year</label>
                    <div className="select-wrap">
                      <select
                        value={form.passoutYear}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, passoutYear: e.target.value }))
                        }
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <span className="chev">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Date of Birth</label>
                    <div className="date-wrap">
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, dob: e.target.value }))
                        }
                      />

                      <span className="cal-icon">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </span>
                      {errors.dob && (
                        <p style={{ color: "red", fontSize: 12 }}>{errors.dob}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* BUDGET SLIDER */}
                <div className="field-group">
                  <div className="budget-header">
                    <label className="field-label" style={{ marginBottom: 0 }}>
                      Monthly Budget
                    </label>
                    <span className="budget-value">
                      ₹{budget >= 5000 ? "5,000+" : budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="slider-wrap">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={50}
                      value={budget}
                      style={{ background: sliderBg }}
                      onChange={(e) => setBudget(Number(e.target.value))}
                    />
                    {errors.budget && (
                      <p style={{ color: "red", fontSize: 12 }}>{errors.budget}</p>
                    )}
                  </div>
                  <div className="slider-labels">
                    <span>$200</span>
                    <span>$5,000+</span>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="field-group">
                  <label className="field-label">Preferred Location</label>
                  <div className="input-icon-wrap">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <input
                      className="field-input"
                      placeholder="e.g. East Village, London"
                      value={form.location}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, location: e.target.value }))
                      }
                    />
                    {errors.location && (
                      <p style={{ color: "red", fontSize: 12 }}>{errors.location}</p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <button className="btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
                <button className="btn-skip" onClick={handleCancel}>Cancel</button>
              </div>

              {/* VERIFIED BANNER */}
              <div className="verified-banner">
                <div className="verified-left">
                  <div className="verified-shield">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="#0e4d37"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path
                        d="M9 12l2 2 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="verified-text">
                    <h4>Verified Identity</h4>
                    <p>Secure encryption for all student data.</p>
                  </div>
                </div>
                <div className="verified-illus">
                  <svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
                    {/* Two students illustration */}
                    {/* Student 1 */}
                    <circle cx="30" cy="20" r="11" fill="#f4a261" />
                    <rect
                      x="16"
                      y="32"
                      width="28"
                      height="28"
                      rx="8"
                      fill="#e76f51"
                    />
                    <rect
                      x="20"
                      y="36"
                      width="8"
                      height="14"
                      rx="3"
                      fill="#264653"
                    />
                    {/* Hair */}
                    <ellipse cx="30" cy="12" rx="11" ry="6" fill="#264653" />
                    {/* Student 2 */}
                    <circle cx="62" cy="20" r="11" fill="#e9c46a" />
                    <rect
                      x="48"
                      y="32"
                      width="28"
                      height="28"
                      rx="8"
                      fill="#2a9d8f"
                    />
                    <rect
                      x="64"
                      y="36"
                      width="8"
                      height="14"
                      rx="3"
                      fill="#264653"
                    />
                    {/* Hair */}
                    <path d="M51 16 Q62 6 73 16" fill="#6d4c41" stroke="none" />
                    <ellipse cx="62" cy="12" rx="11" ry="5" fill="#6d4c41" />
                    {/* Plant */}
                    <rect
                      x="38"
                      y="48"
                      width="14"
                      height="16"
                      rx="3"
                      fill="#264653"
                    />
                    <ellipse cx="45" cy="44" rx="9" ry="10" fill="#2a9d8f" />
                    <ellipse cx="40" cy="42" rx="6" ry="8" fill="#52b788" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>)
      }


      {/* TOAST */}
      <div className={`toast ${toast ? "show" : ""}`}>
        ✓ Profile saved successfully!
      </div>
    </>
  );
}