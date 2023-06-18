const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Orjinal dosya adını koru
    }
  })
});
const fs = require('fs');
const { get } = require('http');

app.use(express.json()); // JSON verilerini işlemek için middleware ekle

app.use('/videos', express.static('uploads'));

app.get('/videos', (req, res) => {
  // Read the contents of the 'uploads' directory
  fs.readdir('uploads', (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const videoUrls = files.map(file => `uploads/${file}`);

    res.json(videoUrls);
  });
});

app.post('/upload', upload.single('video'), (req, res) => {
  const video = req.file;
  res.status(200).send('Video başarıyla yüklendi.');
});

app.post('/play', (req, res) => {
  const videoPath = req.body.videoPath;
  const videoUrl = `/videos/${videoPath}`;
  const command = `vlc ${videoUrl}`;

  const { exec } = require('child_process');
  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(error || stderr);
      return res.status(500).json({ error: 'Error playing video' });
    }
    console.log('Video playback started');
    res.status(200).json({ message: 'Video playback started' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});
