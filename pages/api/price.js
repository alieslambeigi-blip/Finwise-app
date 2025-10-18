import cheerio from "cheerio";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query } = req.body;
  const url = `https://torob.com/search/?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const prices = [];

    $(".product-card-price").each((i, el) => {
      const priceText = $(el).text().replace(/[^\d]/g, "");
      if (priceText) prices.push(parseInt(priceText));
    });

    if (prices.length === 0) {
      return res.status(200).json({
        minPrice: 0,
        message: "قیمتی یافت نشد، لطفاً نام کالا را دقیق‌تر انتخاب کنید.",
      });
    }

    const minPrice = Math.min(...prices);
    res.status(200).json({ minPrice });
  } catch (error) {
    console.error("Torob scraping error:", error);
    res.status(500).json({ error: "خطا در دریافت قیمت" });
  }
}
