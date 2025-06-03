import fs from "fs";
import path from "path";
import uploadToCloudService from "./uploadFiles.js"; // fungsi upload ke cloud kamu

const validasiUploadImage = async (fileInput) => {
  const tempPath = fileInput.path;
  const originalName = fileInput.originalname;

  // Validasi ekstensi
  const ext = path.extname(originalName).toLowerCase();
  if (![".jpg", ".png", ".jpeg"].includes(ext)) {
    fs.unlinkSync(tempPath);
    throw new Error("Format tidak didukung");
  }

  // Validasi ukuran
  if (fileInput.size > 5 * 1024 * 1024) {
    fs.unlinkSync(tempPath);
    throw new Error("File harus di bawah 5MB");
  }

  // Upload ke cloud
  const cloudUrl = await uploadToCloudService(tempPath);
  
  // Hapus file lokal setelah upload berhasil
  fs.unlinkSync(tempPath);

  return cloudUrl; // Kembalikan URL hasil upload
};

export default validasiUploadImage;
