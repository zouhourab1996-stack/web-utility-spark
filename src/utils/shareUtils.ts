/**
 * Share Utilities - Client-side sharing and referral system
 * Privacy-first, no external tracking by default
 */

export interface ShareData {
  title: string;
  description: string;
  url: string;
  hashtags?: string[];
}

export interface SharePlatform {
  name: string;
  icon: string;
  color: string;
  getUrl: (data: ShareData, includeDonation?: boolean) => string;
}

const DONATION_NOTE = "\n\n💧 Support a rural well project in Tunisia:\nPayPal: anistouati74@gmail.com\nUSDT (BNB): 0x63e8f2a6C384E2d07Bb5061d36682659f7A3BE08";

const DEFAULT_HASHTAGS = ["SmartToolsHub", "FreeTools", "Productivity", "Tunisia"];

// Generate short referral token
export const generateRefToken = (): string => {
  return Math.random().toString(36).substring(2, 8);
};

// Store referral mapping
export const storeReferralMapping = (token: string, path: string): void => {
  try {
    const mappings = JSON.parse(localStorage.getItem('sth_referrals') || '{}');
    mappings[token] = { path, created: Date.now() };
    localStorage.setItem('sth_referrals', JSON.stringify(mappings));
  } catch (e) {
    console.error('Failed to store referral:', e);
  }
};

// Get or create referral token for current page
export const getPageRefToken = (path: string): string => {
  try {
    const mappings = JSON.parse(localStorage.getItem('sth_referrals') || '{}');
    const existing = Object.entries(mappings).find(([_, data]: [string, any]) => data.path === path);
    if (existing) return existing[0];
    
    const token = generateRefToken();
    storeReferralMapping(token, path);
    return token;
  } catch (e) {
    return generateRefToken();
  }
};

// Add UTM parameters to URL
export const addUTMParams = (url: string, platform: string): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.set('utm_source', 'share');
  urlObj.searchParams.set('utm_medium', platform);
  urlObj.searchParams.set('utm_campaign', 'viral');
  
  // Add referral token
  const path = urlObj.hash.replace('#', '') || '/';
  const refToken = getPageRefToken(path);
  urlObj.searchParams.set('ref', refToken);
  
  return urlObj.toString();
};

// Build share message with optional donation note
export const buildShareMessage = (data: ShareData, includeDonation: boolean = false): string => {
  const hashtags = (data.hashtags || DEFAULT_HASHTAGS).map(tag => `#${tag}`).join(' ');
  let message = `${data.title}\n\n${data.description}\n\n${hashtags}`;
  
  if (includeDonation) {
    message += DONATION_NOTE;
  }
  
  return message;
};

// Share platforms configuration
export const SHARE_PLATFORMS: SharePlatform[] = [
  {
    name: 'Twitter',
    icon: '𝕏',
    color: '#000000',
    getUrl: (data, includeDonation) => {
      const text = buildShareMessage(data, includeDonation);
      const url = addUTMParams(data.url, 'twitter');
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }
  },
  {
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    getUrl: (data) => {
      const url = addUTMParams(data.url, 'facebook');
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    getUrl: (data, includeDonation) => {
      const text = buildShareMessage(data, includeDonation);
      const url = addUTMParams(data.url, 'whatsapp');
      return `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
    }
  },
  {
    name: 'Telegram',
    icon: '✈️',
    color: '#0088cc',
    getUrl: (data, includeDonation) => {
      const text = buildShareMessage(data, includeDonation);
      const url = addUTMParams(data.url, 'telegram');
      return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    }
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    getUrl: (data) => {
      const url = addUTMParams(data.url, 'linkedin');
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
  },
  {
    name: 'Email',
    icon: '✉️',
    color: '#EA4335',
    getUrl: (data, includeDonation) => {
      const body = buildShareMessage(data, includeDonation) + '\n\n' + addUTMParams(data.url, 'email');
      return `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(body)}`;
    }
  }
];

// Check if Web Share API is available
export const canUseWebShare = (): boolean => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};

// Native Web Share
export const nativeShare = async (data: ShareData): Promise<boolean> => {
  if (!canUseWebShare()) return false;
  
  try {
    await navigator.share({
      title: data.title,
      text: data.description,
      url: addUTMParams(data.url, 'native')
    });
    return true;
  } catch (e) {
    if ((e as Error).name !== 'AbortError') {
      console.error('Share failed:', e);
    }
    return false;
  }
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (e) {
    console.error('Copy failed:', e);
    return false;
  }
};

// Check if should show share modal (rate limiting)
export const shouldShowShareModal = (): boolean => {
  try {
    const lastShown = localStorage.getItem('sth_last_share_modal');
    if (!lastShown) return true;
    
    const hoursSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
    return hoursSinceLastShown >= 72; // 72 hours = 3 days
  } catch (e) {
    return true;
  }
};

// Mark share modal as shown
export const markShareModalShown = (): void => {
  try {
    localStorage.setItem('sth_last_share_modal', Date.now().toString());
  } catch (e) {
    console.error('Failed to mark modal shown:', e);
  }
};

// Check if user came from referral
export const checkReferral = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
  } catch (e) {
    return null;
  }
};

// Privacy-first analytics stub
declare global {
  interface Window {
    __STH_recordShareEvent?: (platform: string, page: string, ref: string) => void;
  }
}

export const recordShareEvent = (platform: string, page: string, ref: string): void => {
  // Check if user has opted in to analytics
  const analyticsEnabled = localStorage.getItem('sth_analytics_enabled') === 'true';
  
  if (analyticsEnabled && typeof window.__STH_recordShareEvent === 'function') {
    window.__STH_recordShareEvent(platform, page, ref);
  }
  
  // Always log to console for debugging
  console.log('[Share Event]', { platform, page, ref, timestamp: new Date().toISOString() });
};

// Enable/disable analytics
export const setAnalyticsEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem('sth_analytics_enabled', enabled.toString());
  } catch (e) {
    console.error('Failed to set analytics preference:', e);
  }
};

export const isAnalyticsEnabled = (): boolean => {
  try {
    return localStorage.getItem('sth_analytics_enabled') === 'true';
  } catch (e) {
    return false;
  }
};
