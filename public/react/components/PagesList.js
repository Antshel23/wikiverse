import React from 'react';
import { Page } from './Page';

export const PagesList = function ({ pages, onSelect }) {
  return (
	<>
    <ul>
      {pages.map(function (page) {
        return (
          <li key={page.slug} onClick={function () { onSelect(page.slug); }}>
            {page.title}
          </li>
        );
      })}
    </ul>

	<button>dsfd</button>
	</>
  );
};