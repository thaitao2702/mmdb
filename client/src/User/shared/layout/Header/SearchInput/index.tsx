import React, { useState, useRef } from 'react';
import { debounce } from 'lodash';

import { useApi } from 'shared/hooks/api';
import usePreventRaceCondition from 'shared/hooks/api/preventRaceCondition';
import onOutSiteClick from 'shared/hooks/onOutSideClick';
import { ApiUrl } from 'shared/config/apiUrl';

import { SearchIcon } from 'shared/svgs';
import './styles.scss';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const makeRequest = useApi('get', ApiUrl.findAllDataType)[1];
  const [getSearchData] = usePreventRaceCondition(makeRequest);
  const $searchInputCtn = useRef<HTMLDivElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const activeSearch = () => setIsSearchActive(true);
  const deActiveSearch = () => setIsSearchActive(false);

  const handleSearchInputChange = async (value: string) => {
    setSearchValue(value);
    try {
      const params = { searchValue: value };
      const response = (await getSearchData(params)) as any;
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChangeDebounced = debounce(handleSearchInputChange, 400);

  onOutSiteClick([$searchInputCtn], isSearchActive, deActiveSearch, null);

  return (
    <div
      ref={$searchInputCtn}
      className={`c-header-search-ctn flex-vertical-center ${
        isSearchActive === true ? 'input-focus' : ''
      }`}
    >
      <input
        className="c-header-search__input"
        onChange={(e) => handleSearchInputChangeDebounced(e.target.value)}
        onClick={activeSearch}
      ></input>
      {isSearchActive && (
        <div className="c-header-search__result" style={{ color: 'black' }}>
          Search result
        </div>
      )}
      <SearchIcon customStyle={{ color: 'rgba(0,0,0,0.54)' }}></SearchIcon>
    </div>
  );
};

export default SearchInput;
