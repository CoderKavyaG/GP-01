import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaGamepad, FaNewspaper } from 'react-icons/fa';

const NewsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: #8a2be2;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 0.5rem 1rem;
  width: 300px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:focus-within {
    background: rgba(255, 255, 255, 0.15);
    border-color: #8a2be2;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: #fff;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #8a2be2;
  margin-right: 0.5rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(45deg, #8a2be2, #9370db)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const NewsCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsTitle = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const NewsDescription = styled.p`
  color: #b8b8d1;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const NewsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8a2be2;
  font-size: 0.9rem;
`;

const NewsLink = styled.a`
  color: #8a2be2;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #9370db;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.2rem;
  padding: 2rem;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  padding: 2rem;
  grid-column: 1 / -1;
`;

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredNews, setFilteredNews] = useState([]);

  const gamingKeywords = [
    'gaming', 'video game', 'esports', 'game development', 'gamer',
    'playstation', 'xbox', 'nintendo', 'steam', 'pc gaming',
    'game release', 'game update', 'game news', 'gaming industry'
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            gamingKeywords.join(' OR ')
          )}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data.articles);
        setFilteredNews(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = [...news];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(article => {
        const content = `${article.title} ${article.description}`.toLowerCase();
        return content.includes(activeFilter.toLowerCase());
      });
    }

    setFilteredNews(filtered);
  }, [searchQuery, activeFilter, news]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <LoadingMessage>Loading gaming news...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <NewsContainer>
      <Header>
        <Title>
          <FaNewspaper /> Gaming News
        </Title>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search for game news..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchBar>
      </Header>

      <FiltersContainer>
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => handleFilter('all')}
        >
          <FaFilter /> All News
        </FilterButton>
        <FilterButton
          active={activeFilter === 'release'}
          onClick={() => handleFilter('release')}
        >
          <FaGamepad /> Game Releases
        </FilterButton>
        <FilterButton
          active={activeFilter === 'esports'}
          onClick={() => handleFilter('esports')}
        >
          <FaGamepad /> Esports
        </FilterButton>
        <FilterButton
          active={activeFilter === 'industry'}
          onClick={() => handleFilter('industry')}
        >
          <FaGamepad /> Industry News
        </FilterButton>
      </FiltersContainer>

      <NewsGrid>
        {filteredNews.length === 0 ? (
          <NoResultsMessage>No news articles found matching your criteria.</NoResultsMessage>
        ) : (
          filteredNews.map((article, index) => (
            <NewsCard key={index}>
              <NewsImage
                src={article.urlToImage || 'https://via.placeholder.com/300x200?text=Gaming+News'}
                alt={article.title}
              />
              <NewsContent>
                <NewsTitle>{article.title}</NewsTitle>
                <NewsDescription>
                  {article.description}
                </NewsDescription>
                <NewsMeta>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <NewsLink href={article.url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </NewsLink>
                </NewsMeta>
              </NewsContent>
            </NewsCard>
          ))
        )}
      </NewsGrid>
    </NewsContainer>
  );
}

export default NewsPage; 