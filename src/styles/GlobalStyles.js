import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

:root{
  --color-moderate-blue: hsl(238, 40%, 52%);
  --color-soft-red: hsl(358, 79%, 66%);
  --color-light-grayish-blue: hsl(239, 57%, 85%);
  --color-pale-red: hsl(357, 100%, 86%);
  --color-dark-blue: hsl(212, 24%, 26%);
  --color-grayish-blue: hsl(211, 10%, 45%);
  --color-light-gray: hsl(223, 19%, 93%);
  --color-very-light-gray: hsl(228, 33%, 97%);
  --color-white: hsl(0, 0%, 100%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Rubik", sans-serif;
  color: var(--color-grayish-blue);
  line-height: 1.5;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}
`

export default GlobalStyles
