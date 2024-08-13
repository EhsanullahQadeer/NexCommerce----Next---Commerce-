import { useEffect, useState } from 'react';

/**
 * Custom React hook that checks if all images inside a container have been loaded.
 * @param {React.RefObject<HTMLDivElement>} containerRef - Reference to the container element.
 * @returns {boolean} - True if all images inside the container have been loaded, false otherwise.
 */
export const useImagesLoaded = (
  containerRef: React.RefObject<HTMLDivElement>
): boolean => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images =
      containerRef.current?.querySelectorAll<HTMLImageElement>('img');
    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const onImageEvent = () => {
      loadedCount += 1;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageEvent();
      } else {
        img.addEventListener('load', onImageEvent);
        img.addEventListener('error', onImageEvent);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', onImageEvent);
        img.removeEventListener('error', onImageEvent);
      });
    };
  }, [containerRef]);

  return imagesLoaded;
};
