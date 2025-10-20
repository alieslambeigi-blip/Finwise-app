import { useState } from "react";

export default function SmartBuy() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];
      setImagePreview(reader.result);
      setLoading(true);

      const visionRes = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const visionData = await visionRes.json();
      setQuery(visionData.query || "کالا");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const fetchPrices = async () => {
    setLoading(true);
    const res = await fetch("/api/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setMinPrice(data.minPrice);
    setMessage(data.message);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>🛍️ خرید هوشمند Finwise</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreview && <img src={imagePreview} alt="preview" style={{ maxWidth: "300px", margin: "1rem auto" }} />}
      {loading && <p>⏳ در حال پردازش...</p>}
      {query && (
        <div>
          <p>🔎 نام تشخیص داده‌شده: {query}</p>
          <button onClick={fetchPrices}>تأیید و دریافت قیمت</button>
        </div>
      )}
      {minPrice && (
        <div>
          <p>💰 کمترین قیمت: {minPrice}</p>
          <p>📌 پیشنهاد: {message}</p>
        </div>
      )}
    </div>
  );
      }
