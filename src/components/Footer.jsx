import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGamepad, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaDiscord, FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%);
  color: #fff;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(138, 43, 226, 0.2);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #8a2be2;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #b8b8d1;
    text-decoration: none;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #8a2be2;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    color: #b8b8d1;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #8a2be2;
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    padding: 0.8rem;
    color: #fff;

    &:focus {
      outline: none;
      border-color: #8a2be2;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  button {
    background: linear-gradient(45deg, #8a2be2, #9370db);
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(138, 43, 226, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    color: #b8b8d1;
    font-size: 0.9rem;
  }

  a {
    color: #8a2be2;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #9370db;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3><FaGamepad /> Gameipedia</h3>
          <p style={{ color: '#b8b8d1', lineHeight: '1.6' }}>
            Your ultimate destination for discovering, exploring, and connecting with the gaming world.
          </p>
          <SocialLinks>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/developer-portal">Developer Portal</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Categories</h3>
          <FooterLinks>
            <li><Link to="/games?category=action">Action</Link></li>
            <li><Link to="/games?category=rpg">RPG</Link></li>
            <li><Link to="/games?category=adventure">Adventure</Link></li>
            <li><Link to="/games?category=strategy">Strategy</Link></li>
            <li><Link to="/games?category=sports">Sports</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p style={{ color: '#b8b8d1', marginBottom: '1rem' }}>
            Subscribe to our newsletter for the latest gaming news and updates.
          </p>
          <NewsletterForm>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© 2024 Gameipedia. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy Policy</Link> |{' '}
          <Link to="/terms">Terms of Service</Link> |{' '}
          <Link to="/contact">Contact Us</Link>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer; 