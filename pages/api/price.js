import cheerio from "cheerio";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.body;
  const url = `https://torob.com/search/?q=${encodeURIComponent(query)}`;
  const html = await fetch(url).then(r => r.text());
  const $ = cheerio.load(html);

  const prices = [];
  $(".product-card").each((i, el) => {
    const title = $(el).find(".product-title").text().trim();
    const price = $(el).find(".price").text().trim();
    if (title && price) prices.push({ title, price });
  });

  if (prices.length === 0) {
    return res.status(200).json({
      minPrice: null,
      message: "قیمتی یافت نشد. لطفاً کالا را دقیق‌تر مشخص کنید.",
    });
  }

  const minPrice = prices[0].price;
  res.status(200).json({
    minPrice,
    message: `کمترین قیمت یافت‌شده در ترب برای "${query}"`,
  });
}
