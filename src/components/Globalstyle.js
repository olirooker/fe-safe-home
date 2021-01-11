import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html {
  min-height: 100%;
}
  body {
    background: ${({ theme }) => theme.body};
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.text};
    font-family: Roboto, sans-serif;
    transition: all 0.50s linear;
    min-height: 100%;

  } 

  
  .navButton {
    color: ${({ theme }) => theme.navbarText};
}
.form-control {
  background: ${({ theme }) => theme.formBackground};
}

.headerContainer {
  background: ${({ theme }) => theme.headerBackground};
}
  `
