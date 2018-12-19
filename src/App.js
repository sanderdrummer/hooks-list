/** @jsx jsx */

import { ArticleList } from './article/article-list';
import { Component } from 'react';
import {
  ThemeProvider,
  light,
  dark,
  HeaderNavBar,
  ThemeSwitcher,
  Block,
  Global,
  css,
  jsx,
} from 'bricks-of-sand';

class App extends Component {
  render() {
    return (
      <ThemeProvider themes={{ light, dark }}>
        <Global
          styles={css`
            html {
              font-size: 18px;
              font-family: sans-serif;
            }

            label {
              display: block;
            }

            @media only screen and (min-width: 30em) {
              html {
                font-size: 24px;
              }
            }
            h1,
            h2,
            h3 {
              text-transform: uppercase;
              font-weight: lighter;
            }
          `}
        />
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
