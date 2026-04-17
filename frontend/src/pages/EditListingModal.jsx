import { useState, useEffect } from "react";

export default function EditListingModal({ editData, setEditData, onUpdate }) {
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
    }
  }, [editData]);

  if (!editData) return null; // ❌ don't render if no data

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
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          style={inputStyle}
        />

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