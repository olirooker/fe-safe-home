import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.text};
    font-family: Roboto, sans-serif;
    transition: all 0.50s linear;
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

.nav {
  background: ${({ theme }) => theme.navBackground};
  
}

.MuiTab-wrapper {
  color: ${({ theme }) => theme.navText};
}
  `
