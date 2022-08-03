/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import 'moment/locale/fr';

import { grpahCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';
// without this line it didn't work
moment.locale('fr');

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl dark:text-white mb-8 font-semibold border-b pb-4">
        {slug ? 'Articles similaires' : 'Articles récents'}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              loader={grpahCMSImageLoader}
              alt={post.titre}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.image.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 dark:text-white font-xs">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>
              <a className="transition ease dark:hover:text-white dark:text-gray-400">
                {post.titre}
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
