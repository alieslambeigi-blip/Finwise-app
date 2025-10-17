import { useState } from "react";

export default function SmartBuy() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const analyzePurchase = () => {
    const mockItem = "گوشی موبایل";
    const mockPrice = 12000000;
    const userBudget = 5000000;

    let suggestion = "";

    if (mockPrice <= userBudget) {
      suggestion = "✅ پیشنهاد: خرید نقدی";
    } else if (mockPrice <= userBudget * 2) {
      suggestion = "💳 پیشنهاد: خرید اقساطی BNPL";
    } else {
      suggestion = "📦 پیشنهاد: کالای مشابه ارزان‌تر یا دریافت وام";
    }

    setResult(`کالا: ${mockItem}\nقیمت: ${mockPrice.toLocaleString()} تومان\n${suggestion}`);
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
          </button>
        </div>
      )}

      {result && (
        <pre style={{ marginTop: "2rem", background: "#f0f0f0", padding: "1rem" }}>{result}</pre>
      )}
    </div>
  );
}
