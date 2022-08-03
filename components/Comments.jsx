import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4 dark:text-white">
            {comments.length === 1 && <p>1 Commentaire</p>}
            {comments.length > 1 && <p>{comments.length} Commentaires</p>}
          </h3>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="border-b border-gray-100 mb-4 pb-4 dark:text-white"
            >
              <p className="mb-4">
                <span className="font-semibold">{comment.nom}</span> le{" "}
                {moment(comment.createdAt).format("DD MMM YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 dark:text-gray-400 w-full">
                {parse(comment.commentaire)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
