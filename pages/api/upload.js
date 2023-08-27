// api/upload.js
import cloudinary from 'cloudinary';

export default async function handler(req, res) {
  try {
    const image = req.files.image;

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(image.path);

    res.status(200).json(cloudinaryResponse);
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).send('Error uploading image');
  }
}
