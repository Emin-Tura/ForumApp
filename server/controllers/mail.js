import tryCatch from "./utils/tryCatch.js";
import sendEmail from "./utils/sendEmail.js";

export const createDeleteRequesMail = tryCatch(async (req, res) => {
  const { contentHead, author, sendMailUser } = req.body;
  const send_to = sendMailUser.map((user) => user);
  const sent_from = process.env.EMAIL_USER;
  const reply_to = process.env.EMAIL_USER;
  const subject = "mühendismedresesi.com.tr silme isteği...";
  const message = `
  <h4>Selamün Aleyküm:</h4>
  <p>Yeni bir silme isteği var!</p>
  <p>Silinecek İçerik :${contentHead}</p>
  <p>Silinmesini İsteyen Yazar: ${author}</p>
  <p>Saygılarımızla...</p>
  <footer>mühendismedresesi.com.tr</footer>
  <br />
  <br />
  <img src="https://firebasestorage.googleapis.com/v0/b/cypointapp.appspot.com/o/profile%2F637b42329d5b09d01394e130%2F71c248ed-0240-408e-a4dd-76a7ccb1a92e.png?alt=media&token=1046ecc4-b37c-494a-9620-0599e921e9ed" alt="Cypoint Logo" />
  `;
  const mail = {
    send_to,
    sent_from,
    reply_to,
    subject,
    message,
  };
  try {
    await sendEmail(mail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createContentMail = tryCatch(async (req, res) => {
  const { contactName, contactMail, contactMessage } = req.body;

  try {
    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = process.env.EMAIL_USER;
    const subject = "mühendismedresesi.com.tr iletişim formu...";
    const message = `
      <h4>Selamün Aleyküm:</h4>
      <p>Yeni bir iletişim formu var!</p>
      <p>İsim: ${contactName}</p>
      <p>Email: ${contactMail}</p>
      <p>Mesaj: ${contactMessage}</p>
      <p>Saygılarımızla...</p>
      <footer>mühendismedresesi.com.tr</footer>
      <br />
      <br />
      <img src="https://firebasestorage.googleapis.com/v0/b/cypointapp.appspot.com/o/profile%2F637b42329d5b09d01394e130%2F71c248ed-0240-408e-a4dd-76a7ccb1a92e.png?alt=media&token=1046ecc4-b37c-494a-9620-0599e921e9ed" alt="Cypoint Logo" />
      `;
    const mail = {
      send_to,
      sent_from,
      reply_to,
      subject,
      message,
    };
    await sendEmail(mail);
    res.status(200).json({
      success: true,
      result: "Mesajınız başarıyla gönderildi.",
    });
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu." });
  }
});
