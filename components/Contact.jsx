/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Head from 'next/head';
import { submitContact } from '../services';

const Contact = () => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: null,
    subject: null,
    content: null,
  });

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'text' || target.type === 'textarea') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,

      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { email, subject, content } = formData;
    if (!email || !subject || !content) {
      setError(true);
      return;
    }
    const contactObj = {
      email,
      subject,
      content,
    };
    submitContact(contactObj).then((res) => {
      if (res.createContact) {
        formData.email = '';
        formData.subject = '';
        formData.content = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };
  return (
    <>
      <Head>
        <title>Blog - Contact</title>
      </Head>
      <div className="bg-white/80 dark:bg-gray-900/80 m-20 rounded-2xl mt-3 py-8 lg:py-16 px-4 mx-4 md:mx-auto max-w-screen-md">
        <h2 className="mb-4 text-2xl lg:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 text-sm md:text-lg">
          Besoin de me contacter? Remplissez le formulaire ci-dessous et je vous
          répondrais dans les plus brefs délais
        </p>
        <form method="post" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Votre email
            </label>
            <input
              type="text"
              name="email"
              value={formData.comment}
              onChange={onInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-gray-300 focus:ring-gray-300 dark:shadow-sm-light"
              placeholder="email@guillaumemareschal.fr"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              onChange={onInputChange}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-gray-300 focus:ring-gray-300 dark:shadow-sm-light"
              placeholder="Expliquez ici en quoi nous pouvons vous aider"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Votre message
            </label>
            <textarea
              name="content"
              onChange={onInputChange}
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-gray-300 focus:ring-gray-300"
              placeholder="Laissez votre commentaire"
            />
          </div>
          {error && (
          <p className="text-xs text-red-500">Tout les champs sont requis</p>
          )}
          <button
            type="button"
            onClick={handlePostSubmission}
            id="open-btn"
            className="flex transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer align-middle justify-center w-28"
          >
            Envoyer
          </button>
          {showSuccessMessage && (
            <span className="text-xl float-right font-semibold mt-3 text-green-500">
              Votre demande de contact à été envoyée
            </span>

          )}
        </form>
      </div>
    </>
  );
};

export default Contact;
