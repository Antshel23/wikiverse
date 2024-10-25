import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';
import { ArticleForm} from './ArticleForm'
import apiURL from '../api';

export const App = function () {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [addingArticle, setAddingArticle] = useState(false)

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


//fetch article details
  async function articleDetailFetch(slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`);
    const data = await response.json();
    setSelectedPage(data);
  }
//reset selected page state
  function resetSelectedPage() {
    setSelectedPage(null);
  }

//toggle adding article state
  function resetAddingArticle() {
    setAddingArticle(!addingArticle);
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting📚</h2>

      <button onClick={resetAddingArticle}>
        {addingArticle ? 'Cancel' : 'Add Article'}
      </button>

      {addingArticle ? (
        <ArticleForm onSubmit={resetAddingArticle} />
      ) : selectedPage ? (
        <Page article={selectedPage} onBack={resetSelectedPage} />
      ) : (
        <PagesList pages={pages} onSelect={articleDetailFetch} />
      )}
    </main>
  );
};

