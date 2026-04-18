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
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 16 }}>Edit Listing</h2>

        {/* Title */}
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={inputStyle}
        />

        {/* Price */}
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          style={inputStyle}
        />

        {/* Location */}
        <div style={{ marginBottom: 10 }}>
          <select
            value={selectedAreaId}
            onChange={handleAreaChange}
            style={inputStyle}
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
            style={inputStyle}
          >
            <option value="">Sub-area</option>
            {locationDataset
              .find((a) => a.area_id === selectedAreaId)
              ?.sub_areas.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
          </select>

          <input
            placeholder="Custom location"
            value={customLocation}
            onChange={handleCustomLocationChange}
            style={inputStyle}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            onClick={() => onUpdate(form)}
            style={saveBtn}
          >
            Save
          </button>

          <button
            onClick={() => setEditData(null)}
            style={cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalStyle = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  width: 320
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #ddd"
};

const saveBtn = {
  flex: 1,
  padding: 10,
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};

const cancelBtn = {
  flex: 1,
  padding: 10,
  background: "#e5e7eb",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};