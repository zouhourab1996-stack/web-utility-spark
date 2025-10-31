const INDEXNOW_API_KEY = 'a056ae0d787342ff9c70bce0dc58b379';
const BASE_URL = 'https://zouhourab1996-stack.github.io/free-ads-tools-hub-classifed';
const KEY_LOCATION = `${BASE_URL}/a056ae0d787342ff9c70bce0dc58b379.txt`;

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

const INDEXNOW_ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

export const submitToIndexNow = async (urls: string[]) => {
  const submission: IndexNowSubmission = {
    host: 'zouhourab1996-stack.github.io',
    key: INDEXNOW_API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.map(url => url.startsWith('http') ? url : `${BASE_URL}${url}`)
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(endpoint =>
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      })
    )
  );

  return results.map((result, index) => ({
    endpoint: INDEXNOW_ENDPOINTS[index],
    success: result.status === 'fulfilled' && result.value.ok,
    status: result.status === 'fulfilled' ? result.value.status : 'failed'
  }));
};

export const submitCurrentPage = async () => {
  const currentUrl = window.location.href;
  return submitToIndexNow([currentUrl]);
};

export const submitSitemap = async () => {
  const urls = [
    '/',
    '/free-ads',
    '/post-ad',
    '/games',
    '/about-us',
    '/contact-us',
    '/privacy-policy',
    '/terms-of-service'
  ];
  
  return submitToIndexNow(urls);
};
