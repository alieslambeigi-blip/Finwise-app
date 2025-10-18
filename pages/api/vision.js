import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
  keyFilename: "google-vision-key.json",
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { image } = req.body;

  const [result] = await client.labelDetection({
    image: { content: image },
  });

  const labels = result.labelAnnotations.map((label) => label.description);
  res.status(200).json({ labels });
}
Create vision.js for image recognition
