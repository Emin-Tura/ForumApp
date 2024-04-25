import React, { useRef } from "react";
import me from "../../assets/me.jpg";
import { Button, TextField } from "@mui/material";
import { t } from "i18next";
import { Send } from "@mui/icons-material";
import { contactEmail } from "../../actions/sendMail";
import { useValue } from "../../context/ContextProvider";

const AboutUs = () => {
  const { dispatch } = useValue();

  const contactNameRef = useRef();
  const contactEmailRef = useRef();
  const contactMessageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactName = contactNameRef.current.value;
    const contactMail = contactEmailRef.current.value;
    const contactMessage = contactMessageRef.current.value;

    const data = {
      contactName,
      contactMail,
      contactMessage,
    };

    contactEmail(data, dispatch);

    contactNameRef.current.value = "";
    contactEmailRef.current.value = "";
    contactMessageRef.current.value = "";
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center my-4 w-11/12">
        {/* <img src={me} alt="me" className="w-52 h-56 rounded-lg" /> */}

        <div>
          <p className="text-lg font-sans leading-7 text-gray-700 text-justify ml-12">
            Selamün Aleyküm, Ben Muhammed Emin Tura. Yazılım geliştirmeyle
            ilgileniyorum ve özellikle web teknolojileri üzerine çalışıyorum.
            <br />
            <br />
            Bu web sitesini oluşturma amacım, hem öğrenirken içerik üretmek hem
            de bilgilerimi paylaşmaktı. İlk olarak GatsbyJs kullanarak statik
            bir yapı oluşturma fikriyle başladım. Ancak daha sonra
            arkadaşlarımın teşvikiyle sistemi dinamik hale getirmeye karar
            verdim. Üyelik sistemi ekleyerek, arkadaşlarımın da içerik
            yayınlayabileceği bir platform oluşturdum.
            <br />
            Sitemizin isminden de anlaşılacağı üzere, medrese usulü bir sistem
            kullanmayı tercih ettik. Bu şekilde hem mühendislik hem de İslami
            alanlarda içerikler paylaşmayı hedefledik.
            <br />
            Sitemizde, web teknolojileri, yazılım geliştirme, mühendislik, İslam
            ve daha birçok konuda yazılar paylaşmayı düşünüyoruz. Amacımız, hem
            bilgi paylaşımında bulunmak hem de sürekli öğrenerek gelişmek.
            İnşallah bu amacımıza ulaşmak için çalışmalarımızı sürdüreceğiz.
          </p>
        </div>
      </div>

      {/* İletişim Sayfası da yapabilirsin oraya koy buraya projelerini koyarsın */}
      <section className="w-11/12 bg-slate-100 rounded-lg shadow-lg my-16">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-8 text-3xl tracking-tight font-bold text-center">
            Herhangi bir sorunuz veya öneriniz varsa bana ulaşabilirsiniz. 📩
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <div className="w-1/3">
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="name"
                  label={"Adınız"}
                  type="text"
                  fullWidth
                  inputRef={contactNameRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="email"
                  type="email"
                  label={t("user.email")}
                  fullWidth
                  inputRef={contactEmailRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
              </div>
              <div className="w-2/3 ml-4">
                <label for="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mesajınızı buraya yazın..."
                  ref={contactMessageRef}
                  required
                  minLength={10}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="contained" endIcon={<Send />}>
                {t("button.send")}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
