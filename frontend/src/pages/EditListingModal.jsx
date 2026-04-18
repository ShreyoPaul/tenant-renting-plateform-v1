import { useState, useEffect } from "react";
import locationDataset from "../data/location-dataset.json";

export default function EditListingModal({ editData, setEditData, onUpdate }) {
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedSubAreaId, setSelectedSubAreaId] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: ""
  });

  // 🔥 pre-fill data
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        price: editData.price || "",
        location: editData.location || ""
      });

      // 🔥 split location
      const parts = (editData.location || "").split(",").map(p => p.trim());

      const areaObj = locationDataset.find(a => a.area === parts[0]);
      if (areaObj) {
        setSelectedAreaId(areaObj.area_id);

        const sub = areaObj.sub_areas.find(s => s.name === parts[1]);
        if (sub) {
          setSelectedSubAreaId(sub.id);
          setCustomLocation(parts.slice(2).join(", "));
        } else {
          setCustomLocation(parts.slice(1).join(", "));
        }
      }
    }
  }, [editData]);

  if (!editData) return null; // ❌ don't render if no data

  const updateLocation = (area, subArea, custom) => {
    const parts = [area, subArea, custom].filter(Boolean);
    setForm((prev) => ({
      ...prev,
      location: parts.join(", "),
    }));
  };

  const handleAreaChange = (e) => {
    const areaId = e.target.value;
    const area = locationDataset.find((a) => a.area_id === areaId);

    setSelectedAreaId(areaId);
    setSelectedSubAreaId("");

    updateLocation(area?.area || "", "", customLocation);
  };

  const handleSubAreaChange = (e) => {
    const subId = e.target.value;
    setSelectedSubAreaId(subId);

    const area = locationDataset.find((a) => a.area_id === selectedAreaId);
    const sub = area?.sub_areas.find((s) => s.id === subId);

    updateLocation(area?.area || "", sub?.name || "", customLocation);
  };

  const handleCustomLocationChange = (e) => {
    const value = e.target.value;
    setCustomLocation(value);

    const area = locationDataset.find((a) => a.area_id === selectedAreaId);
    const sub = area?.sub_areas.find((s) => s.id === selectedSubAreaId);

    updateLocation(area?.area || "", sub?.name || "", value);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1a1740", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
            Edit Listing
          </h2>
          <p style={{ fontSize: 13, color: "#7b78a0", margin: "0 0 24px", lineHeight: 1.6 }}>
            Update your listing details below
          </p>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              Property Name
            </label>
            <input
              placeholder="e.g., Modern Studio near St. Xavier's"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              style={inputStyle}
            />
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              Monthly Price (₹)
            </label>
            <div style={priceContainerStyle}>
              <span style={{ fontSize: 15, color: "#7b78a0", flexShrink: 0 }}>
                ₹
              </span>
              <input
                placeholder="15,000"
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                style={priceInputStyle}
              />
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>
              Room Location & University Proximity
            </label>
            <div style={locationContainerStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 13, color: "#5c5680" }}>
                <span>📍</span>
                <span>Pick the area first, then sub-area if available.</span>
              </div>
              
              <select
                value={selectedAreaId}
                onChange={handleAreaChange}
                style={selectStyle}
              >
                <option value="">Select area</option>
                {locationDataset.map((area) => (
                  <option key={area.area_id} value={area.area_id}>
                    {area.area}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubAreaId}
                onChange={handleSubAreaChange}
                disabled={!selectedAreaId}
                style={{...selectStyle, backgroundColor: selectedAreaId ? "#fff" : "#f7f5ff"}}
              >
                <option value="">Sub-area (optional)</option>
                {locationDataset
                  .find((a) => a.area_id === selectedAreaId)
                  ?.sub_areas.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>

              <input
                placeholder="Additional location details (e.g., near university, specific landmark)"
                value={customLocation}
                onChange={handleCustomLocationChange}
                style={selectStyle}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button
              onClick={() => setEditData(null)}
              style={cancelBtnStyle}
            >
              Cancel
            </button>

            <button
              onClick={() => onUpdate(form)}
              style={saveBtnStyle}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* 🎨 styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

const modalStyle = {
  background: "#fff",
  padding: "36px 40px",
  borderRadius: 20,
  width: "100%",
  maxWidth: 420,
  boxShadow: "0 8px 32px rgba(91,84,212,0.12)",
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#2e2a50",
  marginBottom: 8
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: 0,
  borderRadius: 12,
  border: "1.5px solid #e8e4f8",
  fontSize: 14,
  color: "#2e2a50",
  outline: "none",
  backgroundColor: "#faf9ff",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  boxSizing: "border-box"
};

const priceContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 16px",
  borderRadius: 12,
  border: "1.5px solid #e8e4f8",
  backgroundColor: "#faf9ff"
};

const priceInputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 14,
  color: "#2e2a50",
  backgroundColor: "transparent",
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

const locationContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "12px 16px",
  borderRadius: 12,
  border: "1.5px solid #e8e4f8",
  backgroundColor: "#faf9ff"
};

const selectStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #d6d1f2",
  fontSize: 14,
  color: "#2e2a50",
  backgroundColor: "#fff",
  outline: "none",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  boxSizing: "border-box"
};

const cancelBtnStyle = {
  flex: 1,
  padding: "12px 24px",
  background: "#7c6ef8",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

const saveBtnStyle = {
  flex: 1,
  padding: "12px 24px",
  background: "linear-gradient(135deg, #4f46e5, #7c6ef8)",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  boxShadow: "0 4px 14px rgba(79,70,229,0.3)"
};