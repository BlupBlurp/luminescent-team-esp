import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { useState, useEffect } from 'react';

export const ImageWithFallback = ({ fallbackSrc, src, ...props }) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state when the src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const onError = () => setHasError(true);
  const displaySrc = hasError ? fallbackSrc : src;

  return <img key={src} src={useBaseUrl(displaySrc)} onError={onError} {...props} />;
};
