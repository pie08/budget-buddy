import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-gray-950: #18212f;
  --color-gray-900: #111827;
  --color-gray-800: #1f2937;
  --color-gray-700: #374151;
  --color-gray-600: #4b5563;
  --color-gray-500: #6b7280;
  --color-gray-400: #9ca3af;
  --color-gray-300: #d1d5db;
  --color-gray-200: #e5e7eb;
  --color-gray-100: #f3f4f6;
  --color-gray-50: #f9fafb;
  --color-gray-0: #fff;

  --color-brand-50: #EAF6F2;
  --color-brand-100: #D1EFE5;
  --color-brand-200: #9EE5CE;
  --color-brand-300: #67E0B7;
  --color-brand-400: #2BDEA2;
  --color-brand-500: #10B981;
  --color-brand-600: #179269;
  --color-brand-700: #166E51;
  --color-brand-800: #144D3A;
  --color-brand-900: #102E24;
  --color-brand-950: #0C1C17;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-blue-100: #cffafe;
  --color-blue-600: #0891b2;

  --color-yellow-100: #fef9c3;
  --color-yellow-700: #b45309;

  --border-radius-sm: 4px;
  --border-radius-md: 6px;

  --overlay-color: rgba(0, 0, 0, 0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  color: var(--color-gray-700);
  line-height: 1.5;
  min-height: 100vh;
}

button {
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  
  &:has(svg) {
    line-height: 0;
  }
}

select {
  cursor: pointer;
}

input,
textarea, 
select {
  font: inherit;
  color: inherit;
}

*:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

`;

export default GlobalStyles;
