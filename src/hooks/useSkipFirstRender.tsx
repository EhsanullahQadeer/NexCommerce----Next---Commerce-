import { useEffect, useRef } from 'react';

function useSkipFirstRender(callback: () => void, dependencies: React.DependencyList): void {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useSkipFirstRender;
