/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@graphcms/rich-text-react-renderer';

import moment from 'moment';

const PostDetail = ({ post }) => (
  <>
    <Head>
      <title>Blog - {post.titre}</title>
    </Head>
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.image.url}
          alt=""
          className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div className="px-4 lg:px-0 dark:text-gray-400">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
            <Image
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
          <div className="font-medium text-gray-700">
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
            <span className="align-middle dark:text-white">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </span>
          </div>
          <div className="text-center m-2">
            {post.categories.map((category, index) => (
              <span key={index} className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-blue-600 text-xs font-medium rounded-full text-white px-4 py-2 cursor-pointer ml-2">
                <Link href={`/category/${category.slug}`}>{category.nom}</Link>
              </span>
            ))}
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold dark:text-white">
          {post.title}
        </h1>
        <RichText
          content={post.contenu.raw}
          renderers={{
            ul: ({ children }) => <ul className="list-disc list-inside pb-6">{children}</ul>,
            p: ({ children }) => <p className="pb-6">{children}</p>,
            a: ({ children }) => <a href={children.props.parent.href} title={children.props.parent.title ? children.props.parent.title : 'Ouvrir le lien'} target="_blank" rel="noreferrer" className="text-indigo-500">{children}</a>,
            img: ({ children }) => <img loading="lazy" src={children.props.parent.src} title={children.props.parent.title} alt={children.props.parent.title} className="shadow rounded max-w-full h-auto align-middle border-none mb-3" />
          }}
        />
      </div>
    </div>
  </>
);

export default PostDetail;
