import { ArticleMap } from './article-state';
import { useState } from 'react';

export interface Article {
  name: string;
  popularity: number;
}

export interface ArticleMap {
  [key: string]: Article;
}

export interface ArticleEntry {
  name: string;
  amount?: string;
  inBasket?: boolean;
}

export interface ArticleEntryMap {
  [key: string]: ArticleEntry;
}

export function useArticleEntries() {
  const [map, updateMap] = useLocalStorage<ArticleEntryMap>(
    'articleEntries',
    {}
  );

  const updateEntries = (entry: ArticleEntry) => {
    updateMap({ ...map, [entry.name]: { ...entry } });
  };

  const clear = () => {
    updateMap({});
  };

  const entries = Object.keys(map)
    .map(key => map[key])
    .sort((a, b) => (a.inBasket === b.inBasket ? 0 : a.inBasket ? 1 : -1));

  return { updateEntries, entries, clear };
}

export function useArticleStore() {
  const [articleMap, updateMap] = useLocalStorage<ArticleMap>('articles', {});

  const updateArticles = (name: string) => {
    const article = articleMap[name];
    const nextArticle = article
      ? { name: article.name, popularity: article.popularity + 1 }
      : { name, popularity: 0 };

    updateMap({ ...articleMap, [name]: nextArticle });
  };

  const articles = Object.keys(articleMap)
    .map(key => articleMap[key])
    .sort((a, b) => b.popularity - a.popularity);

  return { articles, updateArticles };
}

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (map: T) => void] {
  const [item, setInnerValue] = useState(() => {
    try {
      return window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key) || '')
        : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    setInnerValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [item, setValue];
}
