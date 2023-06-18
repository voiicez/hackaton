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

app.use('/videos', express.static('uploads'));

app.post('/upload', upload.single('video'), (req, res) => {
  // Yüklenen videoyu işle
  const video = req.file;

  // ffmpeg kullanarak videoyu yeniden boyutlandır (istediğiniz gibi)
  // Örnek bir dönüşüm komutu:
  // const command = `ffmpeg -i ${video.path} -vf scale=640:480 output.mp4`;
  // Komutu çalıştır ve işlemi kontrol etmek için gerekirse bir geri arama fonksiyonu kullan

  // Videoları işle, örneğin kaydet, işle, vb.
  // Şimdilik sadece başarı yanıtı gönderelim
  res.status(200).send('Video başarıyla yüklendi.');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});
