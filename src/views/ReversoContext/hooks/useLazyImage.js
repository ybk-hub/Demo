import { useState, useEffect } from 'react';

export const useLazyImage = (src) => {
  // 只负责传递src给img标签，不做fetch和缓存
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