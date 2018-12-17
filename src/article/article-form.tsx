import * as React from 'react';
import Downshift from 'downshift';
import {
  Relative,
  Input,
  DropDownCard,
  DropDownCardItem,
  AcceptButton,
  Flex,
} from 'bricks-of-sand';

import { useArticleStore } from './article-state';

export const ArticleForm = (props: { onSelect: (article: string) => void }) => {
  const { articles, updateArticles } = useArticleStore();

  return (
    <Downshift
      onChange={selection => {
        updateArticles(selection.name);
        props.onSelect(selection.name);
      }}
      itemToString={() => ''}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <Relative>
            <Flex>
              <Input placeholder="Artikel" {...getInputProps()} />
              <AcceptButton
                onClick={() => {
                  if (inputValue) {
                    updateArticles(inputValue);
                    props.onSelect(inputValue);
                  }
                }}
              />
            </Flex>
            {isOpen && (
              <DropDownCard
                {...getMenuProps()}
                children={articles
                  .filter(
                    (item: any) =>
                      !inputValue ||
                      item.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item: any, index: number) => (
                    <DropDownCardItem
                      isHovered={highlightedIndex === index}
                      isSelected={selectedItem === item}
                      {...getItemProps({ item, index })}
                      key={item}>
                      {item.name}
                    </DropDownCardItem>
                  ))}
              />
            )}
          </Relative>
        </div>
      )}
    </Downshift>
  );
};
