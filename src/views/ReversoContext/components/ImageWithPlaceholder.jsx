import React, { useState, useEffect } from 'react';

const ImageWithPlaceholder = ({ src, alt, loadingImg, errorImg, style, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div style={{ width: 250, height: 250, background: '#f5f5f5', position: 'relative', ...style }}>
      {!loaded && !error && (
        <img
          src={loadingImg}
          alt="loading"
          style={{ width: 250, height: 250, position: 'absolute', top: 0, left: 0 }}
        />
      )}
      {error && (
        <img
          src={errorImg}
          alt="error"
          style={{ width: 250, height: 250, position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{
          width: 250,
          height: 250,
          opacity: loaded && !error ? 1 : 0,
          transition: 'opacity 0.3s',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...rest}
      />
    </div>
  );
};

export const useLazyImage = (src) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImageSrc(src);
    setLoading(false);
    setError(null);
  }, [src]);

  return { imageSrc, loading, error };
};

export default ImageWithPlaceholder; 