import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
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
