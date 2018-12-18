import { ArticleList } from './article/article-list';
import React, { Component } from 'react';
import {
  ThemeProvider,
  light,
  dark,
  HeaderNavBar,
  ThemeSwitcher,
  Block,
} from 'bricks-of-sand';

import './app.css';

class App extends Component {
  render() {
    return (
      <ThemeProvider themes={{ light, dark }}>
        <HeaderNavBar>
          <Block margin="1rem">
            <ThemeSwitcher />
          </Block>
          <Block margin="1rem">
            <h2>Einkaufsliste</h2>
          </Block>
        </HeaderNavBar>
        <ArticleList />
      </ThemeProvider>
    );
  }
}

export default App;
