import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import 'moment/locale/fr';

import { grpahCMSImageLoader } from '../util';

moment.locale('fr');

const PostCard = ({ post }) => (
  <>
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.image.url}
          alt=""
          className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      <h1 className="transition dark:text-white duration-700 text-center cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.titre}</Link>
      </h1>
      <div className="text-center mt-2 mb-2">
        {post.categories.map((category, index) => (

          <span key={index} className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-blue-600 text-xs font-medium rounded-full text-white px-4 py-2 cursor-pointer ml-2">
            <Link href={`/category/${category.slug}`}>{category.nom}</Link>
          </span>

        ))}
      </div>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <Image
            unoptimized
            loader={grpahCMSImageLoader}
            alt={post.auteur.nom}
            height="30px"
            width="30px"
            className="align-middle rounded-full"
            src={post.auteur.photo.url}
          />
          <p className="inline align-middle text-gray-700 dark:text-white ml-2 font-medium text-lg">
            {post.auteur.nom}
          </p>
        </div>
        <div className="font-medium dark:text-white text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {moment(post.createdAt).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 dark:text-gray-400 font-normal px-4 lg:px-20 mb-8">
        {post.extrait}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continuer la lecture
          </span>
        </Link>
      </div>
    </div>
  </>
);

export default PostCard;
