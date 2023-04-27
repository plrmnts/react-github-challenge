import React, {useState, useEffect} from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import Repositories from './components/Repositories';
import Loading from './components/Loading';
import Pagination from './components/Pagination';


function App() {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('desc');
  const [errorMessage, setErrorMessage] = useState(''); 

  const fetchRepos = async (username) => {
    setLoading(true);
    setErrorMessage('');
    setRepos([]); 

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!response.ok) {
        throw new Error(`User "${username}" not found`); 
      }
      const data = await response.json();
      const nonForkedRepos = data.filter((repo) => !repo.fork);
      setRepos(nonForkedRepos);
    } catch (error) {
      console.error('Error fetching repos:', error);
      setErrorMessage(error.message);
      setRepos([]);
      
    }
    setLoading(false);
  };

  const handleSort = () => {
    const sortedRepos = [...repos].sort((a, b) => {
      return sortOrder === 'desc'
        ? b.stargazers_count - a.stargazers_count
        : a.stargazers_count - b.stargazers_count;
    });

    setRepos(sortedRepos);
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); 
  };

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>GitHub Repositories</h1>
      <SearchBar onSearch={fetchRepos} />
      {repos.length > 0 && (
        <button className='sort-button' onClick={handleSort}>
          {sortOrder === 'desc' ? 'Sort by Less Stars' : 'Sort by More Stars'}
        </button>
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Pagination
            currentPage={currentPage}
            reposPerPage={reposPerPage}
            totalRepos={repos.length}
            paginate={paginate}
          />
          <Repositories repos={currentRepos} />
          <Pagination
            currentPage={currentPage}
            reposPerPage={reposPerPage}
            totalRepos={repos.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default App;
