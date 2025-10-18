import React, { useState } from "react";

export default function SmartBuy() {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [result, setResult] = useState("");
  const [userBudget, setUserBudget] = useState(10000000); // بودجه فرضی

  // آپلود تصویر و تبدیل به base64
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1];
      setBase64(base64String);
      setImage(reader.result);

      // ارسال به Vision API
      const response = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64String }),
      });

      const data = await response.json();
      setLabels(data.labels || []);
    };
    reader.readAsDataURL(file);
  };

  // تحلیل و پیشنهاد خرید
  const analyzePurchase = async () => {
    const query = selectedLabel || labels[0];
    if (!query) {
      setResult("❌ هیچ کالایی شناسایی نشد.");
      return;
    }

    // ارسال به API قیمت
    const response = await fetch("/api/price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const price = data.minPrice;

    if (price === 0) {
      setResult("❌ قیمت کالا یافت نشد. لطفاً نام دقیق‌تری انتخاب کنید.");
      return;
    }

    // تحلیل بودجه و پیشنهاد
    let suggestion = "";
    if (price <= userBudget) {
      suggestion = "✅ خرید نقدی پیشنهاد می‌شود.";
    } else if (price <= userBudget * 2) {
      suggestion = "💳 خرید اقساطی BNPL پیشنهاد می‌شود.";
    } else {
      suggestion = "📉 پیشنهاد: کالای مشابه ارزان‌تر یا دریافت وام.";
    }

    setResult(`📦 کالا: ${query}\n💰 قیمت: ${price.toLocaleString()} تومان\n🛍️ ${suggestion}`);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", direction: "rtl" }}>
      <h1>🛍️ خرید هوشمند Finwise</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {image && (
        <div style={{ marginTop: "1rem" }}>
          <img src={image} alt="کالا" style={{ width: "200px" }} />
        </div>
      )}

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

      <button onClick={analyzePurchase} style={{ marginTop: "1rem" }}>
        تحلیل و پیشنهاد خرید
      </button>

      {result && (
        <div style={{ marginTop: "2rem", background: "#eee", padding: "1rem" }}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
