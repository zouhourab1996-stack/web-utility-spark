/**
 * Privacy-First Analytics Utilities
 * Client-side only, opt-in, no external tracking by default
 */

interface AnalyticsEvent {
  type: string;
  data: Record<string, any>;
  timestamp: number;
}

const MAX_EVENTS = 100; // Keep only last 100 events

// Store analytics events in localStorage
const storeEvent = (event: AnalyticsEvent): void => {
  try {
    const analyticsEnabled = localStorage.getItem('sth_analytics_enabled') === 'true';
    if (!analyticsEnabled) return;

    const events = getStoredEvents();
    events.push(event);
    
    // Keep only last MAX_EVENTS
    const trimmed = events.slice(-MAX_EVENTS);
    localStorage.setItem('sth_analytics_events', JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to store analytics event:', e);
  }
};

// Retrieve stored events
const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    const stored = localStorage.getItem('sth_analytics_events');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

// Clear all analytics data
export const clearAnalytics = (): void => {
  try {
    localStorage.removeItem('sth_analytics_events');
    console.log('[Analytics] All data cleared');
  } catch (e) {
    console.error('Failed to clear analytics:', e);
  }
};

// Track page view
export const trackPageView = (page: string): void => {
  const event: AnalyticsEvent = {
    type: 'page_view',
    data: { page, referrer: document.referrer },
    timestamp: Date.now(),
  };
  
  storeEvent(event);
  console.log('[Analytics] Page view:', page);
};

// Track tool usage
export const trackToolUsage = (toolName: string, action: string, metadata?: Record<string, any>): void => {
  const event: AnalyticsEvent = {
    type: 'tool_usage',
    data: { toolName, action, ...metadata },
    timestamp: Date.now(),
  };
  
  storeEvent(event);
  console.log('[Analytics] Tool usage:', toolName, action);
};

// Track share action
export const trackShare = (platform: string, page: string, ref: string): void => {
  const event: AnalyticsEvent = {
    type: 'share',
    data: { platform, page, ref },
    timestamp: Date.now(),
  };
  
  storeEvent(event);
  console.log('[Analytics] Share:', platform, page);
};

// Get analytics summary
export const getAnalyticsSummary = () => {
  const events = getStoredEvents();
  
  const pageViews = events.filter(e => e.type === 'page_view').length;
  const toolUsage = events.filter(e => e.type === 'tool_usage').length;
  const shares = events.filter(e => e.type === 'share').length;
  
  const topPages = events
    .filter(e => e.type === 'page_view')
    .reduce((acc, e) => {
      const page = e.data.page;
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  const topTools = events
    .filter(e => e.type === 'tool_usage')
    .reduce((acc, e) => {
      const tool = e.data.toolName;
      acc[tool] = (acc[tool] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return {
    totalEvents: events.length,
    pageViews,
    toolUsage,
    shares,
    topPages: Object.entries(topPages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10),
    topTools: Object.entries(topTools)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10),
  };
};

// Export all events (for debugging or backup)
export const exportAnalytics = (): string => {
  const events = getStoredEvents();
  const summary = getAnalyticsSummary();
  
  return JSON.stringify({
    summary,
    events,
    exportedAt: new Date().toISOString(),
  }, null, 2);
};

// Initialize global analytics hook
if (typeof window !== 'undefined') {
  window.__STH_recordShareEvent = (platform: string, page: string, ref: string) => {
    trackShare(platform, page, ref);
  };
}
