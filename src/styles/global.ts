import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --white: #f7f7ff;
        --full-white: #fff;
        --header: #FFFFFF;
        --footer: #FFFFFF;
        --text-color: #0A5053;
        --background: #FDE3E8;
        --hover: #3D93F0;
        --error: #FF4D4F;
        --success:#52C41A;

        --elevation: 0 2px 5px rgb(0 0 0 / 0.1);

        --fs-xl: clamp(4rem, 3.8vw, 6.4rem);
        --fs-lg: clamp(1.6rem, 1.6vw + 0.5rem, 2.4rem);
        //--fs-md: clamp(2.5rem, 3.8vw, 4rem);

        @media screen and (min-width: 1024px) {
            --fs-lg: clamp(1.6rem, 1.6vw, 2.4rem);
        }
    }
    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;

    }
    .no-scroll {
        overflow: hidden;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-weight: normal;
        vertical-align: baseline;
        font-family: 'Nunito', sans-serif;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    p, span, h1, h2{
      color: var(--text-color);
    }

    ol, ul {
        list-style: none;
    }

    a {
        text-decoration: none;

        font-weight: 500;

    &:hover {
      filter: opacity(0.6);
    }
    }

    button {
        cursor: pointer;
        border: none;
    }

    button, input{
        outline: none;
    }

    .ant-form-item-explain-error{
        font-size: 1.25rem;
        font-weight: 500;
    }

    ::-webkit-scrollbar-track {

      background-color: #F4F4F4;
      border-radius: 0px 2px 2px 0px;
  }
  ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: #F4F4F4;
      border-radius: 0px 2px 2px 0px;
  }
  ::-webkit-scrollbar-thumb {

      background: #ccc;
      border-radius: 0px 2px 2px 0px;
  }
`;
