/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj).then((res) => {
      if (res.createCommentaire) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';
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
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold dark:text-white border-b pb-4">
        Laisser un commentaire
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 dark:text-white dark:bg-slate-500"
          name="comment"
          placeholder="Ecrivez votre commentaire..."
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 dark:text-white dark:bg-slate-500"
          placeholder="Votre pseudo"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 dark:text-white dark:bg-slate-500"
          placeholder="Votre email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            {' '}
            Enregistrer mon pseudo & mon email pour mes prochains commentaires
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">Tout les champs sont requis</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Poster votre commentaire
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Votre commentaire est en attente d'approbation
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
