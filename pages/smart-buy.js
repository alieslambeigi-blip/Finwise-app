import { useState } from "react";

export default function SmartBuy() {
  const [image, setImage] = useState(null);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];
      setLoading(true);

      // مرحله ۱: ارسال تصویر به Vision API
      const visionRes = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const visionData = await visionRes.json();
      const queryFromVision = visionData.query || "کالا";
      setQuery(queryFromVision);

      // مرحله ۲: ارسال query به Price API
      const priceRes = await fetch("/api/price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryFromVision }),
      });

      const priceData = await priceRes.json();
      setMinPrice(priceData.minPrice);
      setMessage(priceData.message || "");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>خرید هوشمند Finwise</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>در حال تحلیل تصویر و دریافت قیمت...</p>}
      {query && <p>نام کالا: {query}</p>}
      {minPrice !== null && (
        <p>کمترین قیمت: {minPrice.toLocaleString()} تومان</p>
      )}
      {message && <p>پیشنهاد: {message}</p>}
    </div>
  );
      }
