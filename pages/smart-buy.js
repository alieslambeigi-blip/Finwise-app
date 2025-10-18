import { useState } from "react";
const [selectedLabel, setSelectedLabel] = useState("");
export default function SmartBuy() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [labels, setLabels] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      setLabels(data.labels);
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const fetchPrice = async () => {
    const res = await fetch("/api/price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: labels[0] }),
    });
    const data = await res.json();
    return data.minPrice || 0;
  };

  const analyzePurchase = async () => {
    const price = await fetchPrice();body: JSON.stringify({ query: selectedLabel || labels[0] }),
    const userBudget = 5000000;

    let suggestion = "";

    if (price <= userBudget) {
      suggestion = "✅ پیشنهاد: خرید نقدی";
    } else if (price <= userBudget * 2) {
      suggestion = "💳 پیشنهاد: خرید اقساطی BNPL";
    } else {
      suggestion = "📦 پیشنهاد: کالای مشابه ارزان‌تر یا دریافت وام";
    }

    setResult(`کالا: ${labels[0] || "نامشخص"}\nقیمت: ${price.toLocaleString()} تومان\n${suggestion}`);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛍️ خرید هوشمند Finwise</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && (
        <div style={{ marginTop: "1rem" }}>
          <img src={image} alt="کالا" style={{ width: "200px" }} />
          <button onClick={analyzePurchase} style={{ marginTop: "1rem" }}>
            تحلیل و پیشنهاد خرید
              {labels.length > 0 && (
  <div style={{ marginTop: "1rem" }}>
    <h3>🔍 انتخاب کالا:</h3>
    <select onChange={(e) => setSelectedLabel(e.target.value)}>
      {labels.map((label, index) => (
        <option key={index} value={label}>{label}</option>
      ))}
    </select>
  </div>
)}
          </button>
        </div>
      )}

      {result && (
        <pre style={{ marginTop: "2rem", background: "#f0f0f0", padding: "1rem" }}>{result}</pre>
      )}
    </div>
  );
        }Update smart-buy.js with new logic
