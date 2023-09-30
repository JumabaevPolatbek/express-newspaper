const fs = require('fs');
const path = require('path');

const imageFolder = path.resolve(__dirname, '../../uploads', 'images');

const getImagesPath = async (res) => {
	try {
		console.log('Path join', imageFolder);
		fs.readdir(imageFolder, (err, files) => {
			if (err) {
				console.error('Error reading images folder:', err);
				res.status(500).send('Internal Server Error');
			} else {
				const imageUrls = files.map((file) => `/images/${file}`);
				res.json(imageUrls);
			}
		});
	} catch (error) {
		return res.status(200).json({ message: error });
	}
};

module.exports = { getImagesPath, imageFolder };
