"use client";
import axios from "axios";
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useState } from "react";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const [variant, setVariant] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setVariant(null);

    const phoneRegex = /^998\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      setStatusMessage(
        "Неверный формат телефона. Используйте формат 998xxxxxxxxx",
      );
      setVariant("text-red-500");
      setIsSubmitting(false);
      return;
    }
    console.log(formData);

    try {
      await axios.post("https://form.ccontrol.uz/api/leads", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatusMessage("Успешно отправлена!");
      setVariant("text-green-400");
    } catch (error) {
      if (error.response) {
        console.error("Ошибка при отправке данных:", error.response.data);
        setStatusMessage(
          `Ошибка: ${error.response.data.message || "Произошла ошибка при отправке формы."}`,
        );
      } else {
        console.error("Ошибка сети:", error);
        setStatusMessage("Произошла ошибка при отправке формы.");
      }
      setVariant("text-red-500");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form
              onSubmit={handleSubmit}
              className="contact-form"
              action={contact_form_action}
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="first_name"
                  type="text"
                  placeholder="Имя"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="last_name"
                  type="text"
                  placeholder="Фамилия"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="address"
                  type="text"
                  placeholder="Адрес"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="phone"
                  type="text"
                  placeholder="998XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary mt-5"
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </button>
              {statusMessage && (
                <div
                  className={`mt-4 border-green-400 text-center border-[1px] p-2 rounded-2xl ${variant}`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
