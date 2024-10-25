import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';
import { ArticleForm } from './ArticleForm';
import apiURL from '../api';

export const App = function () {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  useEffect(function () {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPages();
  }, []);

  // Fetch article details
  async function articleDetailFetch(slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`);
    const data = await response.json();
    setSelectedPage(data);
  }

  // Reset selected page state
  function resetSelectedPage() {
    setSelectedPage(null);
  }

  // Toggle adding article state
  function toggleAddingArticle() {
    setIsAddingArticle(!isAddingArticle);
  }

  // Handle article submission
  async function handleArticleSubmit(articleData) {
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      const data = await response.json();
      setPages([...pages, data]); // Add newly created article to pages
      setIsAddingArticle(false); // Close the form
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting📚</h2>

      <button onClick={toggleAddingArticle}>
        {isAddingArticle ? 'Cancel' : 'Add Article'}
      </button>

      {isAddingArticle ? (
        <ArticleForm onSubmit={handleArticleSubmit} />
      ) : selectedPage ? (
        <Page article={selectedPage} onBack={resetSelectedPage} />
      ) : (
        <PagesList pages={pages} onSelect={articleDetailFetch} />
      )}
    </main>
  );
};

