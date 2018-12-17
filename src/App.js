import { ArticleList } from './article/article-list';
import React, { Component } from 'react';
import {
  ThemeProvider,
  light,
  dark,
  HeaderNavBar,
  ThemeSwitcher,
  Block,
  injectGlobal,
  resetCss,
} from 'bricks-of-sand';

injectGlobal(resetCss);
injectGlobal({
  body: {
    fontFamily: 'sans-serif',
  },
});

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
