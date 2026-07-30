import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';

// Integrating MUI with docusuraus: https://webreaper.dev/blog/material-ui-theme-with-docusaurus/
// Note: InitColorSchemeScript is intentionally NOT used here because Docusaurus
// manages its own color-scheme DOM attributes (data-theme). Injecting MUI's script
// alongside Docusaurus's causes a hydration mismatch that triggers a full
// client-side recovery render.
export default function Root({ children }) {
  return (
    <>
      <CssVarsProvider defaultMode="dark">{children}</CssVarsProvider>
    </>
  );
}
