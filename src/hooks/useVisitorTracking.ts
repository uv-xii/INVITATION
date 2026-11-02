import { useEffect, useRef, useState } from 'react';
import { trackVisitor } from '../utils/visitorTracking';

export function useVisitorTracking() {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    void trackVisitor().then((result) => {
      if (result) setTotalVisitors(result.uniqueVisitors);
    });
  }, []);

  return { totalVisitors };
}
