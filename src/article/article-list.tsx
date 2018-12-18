import * as React from 'react';

import { useArticleEntries, ArticleEntry } from './article-state';
import { ArticleForm } from './article-form';
import { Flex, Input, Separator, Block, PrimaryButton } from 'bricks-of-sand';

export const ArticleList = () => {
  const {
    entries,
    updateEntries,
    updateAmount,
    toggleEntry,
    clear,
  } = useArticleEntries();

  const toBasket = entries.filter(entry => !entry.inBasket);
  const inBasket = entries.filter(entry => entry.inBasket);

  return (
    <div>
      {toBasket.map(entry => (
        <Flex
          padding="0.5rem 1rem"
          key={entry.name}
          alignContent="center"
          justifyContent="space-between">
          <div>
            <Input
              value={entry.amount}
              onChange={e => updateAmount(entry, e.target.value)}
            />
          </div>
          <div onClick={() => toggleEntry(entry)}>{entry.name}</div>
        </Flex>
      ))}
      {toBasket.length !== 0 && <Separator margin="0.5rem" />}
      {inBasket.map(entry => (
        <Flex
          padding="0.5rem 1rem"
          key={entry.name}
          onClick={() => toggleEntry(entry)}
          justifyContent="space-between">
          <div>{entry.amount}</div>
          <div>{entry.name}</div>
        </Flex>
      ))}
      <Block padding="1rem">
        <ArticleForm
          onSelect={name =>
            updateEntries({
              name,
              amount: '1',
              inBasket: false,
            })
          }
        />
      </Block>

      <Block padding="1rem">
        <PrimaryButton onClick={clear}>Clear</PrimaryButton>
      </Block>
    </div>
  );
};
