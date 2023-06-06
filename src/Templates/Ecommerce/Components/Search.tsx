import React from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/Search.scss';
import searchLogo from '../../../assets/svg/templates-svg/icon-search.svg';

const Search: React.FC = () => {
  return (
    <form  className='search'>
      <input
        type="text"
        placeholder="Search..."
        
      />
      <button type="submit"><img src={searchLogo} alt="Search Logo" /></button>
    </form>
  );
};

export default Search;
