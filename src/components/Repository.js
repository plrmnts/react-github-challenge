import React from 'react';
import './Repository.css'

const Repository = ({repo}) => {
  return (
    <div className='repo-item'>
      <h3>
      <a 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
        >
            {repo.name}
        </a>
      </h3>
        <p>
          <strong>Username:</strong> {repo.owner.login}
        </p>
        <p>
        <strong>Description:</strong> {repo.description}
      </p>
      <p>
        <strong>Language:</strong> {repo.language}
      </p>
      <p>
        <strong>Stars:</strong> <span className="star-symbol">&#9733;</span> {repo.stargazers_count}
      </p>
    </div>
  );
};

export default Repository;