import React from 'react';
import './Repositories.css'
import Repository from './Repository';

const Repositories = ( {repos} ) => {
  return (
    <ul className='repo-list'>
        {repos.map((repo) => (
            <Repository 
                key={repo.id} 
                repo={repo}
            />
        ))}
    </ul>
  );
};

export default Repositories;
