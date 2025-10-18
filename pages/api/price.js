import cheerio from "cheerio";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.body;
  const url = `https://torob.com/search/?q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const prices = [];

  $(".product-card-price").each((i, el) => {
    const priceText = $(el).text().replace(/[^\d]/g, "");
    if (priceText) prices.push(parseInt(priceText));
  });

  if (prices.length === 0) return res.status(404).json({ error: "قیمتی یافت نشد" });

  const minPrice = Math.min(...prices);
  res.status(200).json({ minPrice });
}
