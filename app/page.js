"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [newArticle, setNewArticle] = useState({ name: '', link: '' });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      const result = await response.json();

      if (result.articles) {
        setArticles(result.articles);
      } else {
        console.error("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newArticle.name.trim() || !newArticle.link.trim()) {
      console.error("Name and Link are required");
      alert("Please enter a name and link");
      return;
    }

    try {
      new URL(newArticle.link);
    } catch (error) {
      console.error("Invalid URL");
      alert("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });

      const result = await response.json();

      if (result.articles) {
        // Refresh
        setArticles(result.articles);
        setNewArticle({ name: '', link: '' });
      } else {
        console.error("Failed to add a new Article");
      }
    } catch (error) {
      console.error("Error adding a new Article:", error);
    }
  };


  const handleVote = async (articleId, voteType) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId, voteType }),
      });

      const result = await response.json();

      if (result.articles) {
        // Refresh 
        setArticles(result.articles);
      } else {
        console.error("Failed to vote for the Article");
      }
    } catch (error) {
      console.error("Error voting for the Article:", error);
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="display-4 mb-4">Article Ranker</h1>

      <div className="mb-4">
        <h2 className="h4 mb-3">Add a new article:</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={newArticle.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Link:</label>
              <input
                type="text"
                name="link"
                value={newArticle.link}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {articles !== null &&
        articles.sort((a, b) => b.votes - a.votes).map((article) => (
          <div className="container mt-5" key={article._id}>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="card text-center mb-4">
                  <div className="card-body bg-info text-white">
                    <h3 className="card-title">{article.name}</h3>
                    <p className="card-text">Points: {article.votes}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <h1 className="card-title" style={{ fontSize: '30px' }}>
                      <p>{article.name}</p>
                    </h1>
                    <p className="card-text article-link">
                      <a href={article.link} target="_blank">{article.link}</a>
                    </p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleVote(article._id, 'upvote')}
                        >
                          <i className="fa fa-thumbs-up"></i> Upvote
                        </button>
                      </li>
                      <li className="list-inline-item">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleVote(article._id, 'downvote')}
                        >
                          <i className="fa fa-thumbs-down"></i> Downvote
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

