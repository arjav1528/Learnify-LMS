import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Please define the CLOUDINARY_CLOUD_NAME environment variable inside .env.local');
}

if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('Please define the CLOUDINARY_API_KEY environment variable inside .env.local');
}

if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Please define the CLOUDINARY_API_SECRET environment variable inside .env.local');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary }; 