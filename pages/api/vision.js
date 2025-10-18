import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
  keyFilename: "google-vision-key.json", // مطمئن شو این فایل در ریشه پروژه هست
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { image } = req.body;

  try {
    const [result] = await client.labelDetection({
      image: { content: image },
    });

    const labels = result.labelAnnotations.map((label) => label.description);
    res.status(200).json({ labels });
  } catch (error) {
    console.error("Vision API error:", error);
    res.status(500).json({ error: "خطا در تشخیص تصویر" });
  }
}
