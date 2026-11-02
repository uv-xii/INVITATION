interface VisitorTrackingResult {
  message: string;
  visitorCount: number;
  uniqueVisitors: number;
}

export async function trackVisitor(): Promise<VisitorTrackingResult | null> {
  try {
    let sessionId = localStorage.getItem('wedding_visitor_id');

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('wedding_visitor_id', sessionId);
    }

    const response = await fetch('/api/visitors/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error(`Visitor tracking failed with status ${response.status}`);
    }

    return await response.json() as VisitorTrackingResult;
  } catch (error) {
    console.error('Visitor tracking failed:', error);
    return null;
  }
}
