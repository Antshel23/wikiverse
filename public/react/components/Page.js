import React from 'react';

export const Page = function ({ article, onBack }) {
  return (
    <div>
      <h3>{article.title}</h3>
      <p><strong>Author:</strong> {article.author.name}</p>
      <p>{article.content}</p>
      <p><strong>Tags:</strong> {article.tags.map(function (tag) { return tag.name; }).join(', ')}</p>
      <p><strong>Date:</strong> {article.createdAt}</p>
      <button onClick={onBack}>Go Back!</button>
    </div>
  );
};
