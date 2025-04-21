const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchGamingNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=gaming&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return data.articles.map(article => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt).toLocaleDateString(),
      // source: article.source.name
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}; 