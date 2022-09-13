import React, { useState, useRef } from 'react';
import { debounce } from 'lodash';

import SearchResultItem from './SearchResultItem';
import PageLoader from 'shared/components/PageLoader';
import NoResultFound from 'shared/components/NoResultFound';

import { useApi } from 'shared/hooks/api';
import usePreventRaceCondition from 'shared/hooks/api/preventRaceCondition';
import onOutSiteClick from 'shared/hooks/onOutSideClick';
import { ApiUrl } from 'shared/config/apiUrl';
import { DataType } from 'shared/const';
import { handleImageUrl } from 'shared/utils';

import { SearchIcon } from 'shared/svgs';
import './styles.scss';

export interface ISearchDataMovieInfo {
  id: number;
  poster: string;
  title: string;
  actors: { name: string }[];
  releasedDate: string;
  dataType: DataType;
}

export interface ISearchDataActorInfo {
  id: number;
  avatar: string;
  name: string;
  dataType: DataType;
  mostPopularMovie: { title: string; releasedDate: string } | null;
}

interface ISearchDataResponse {
  success: boolean;
  data: ISearchData[];
}

type ISearchData = ISearchDataMovieInfo | ISearchDataActorInfo;

interface IHeaderSearchInputProps {
  placeHolderText?: string;
}

const HeaderSearchInput = ({ placeHolderText = '' }: IHeaderSearchInputProps) => {
  const [, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<ISearchData[]>();
  const makeRequest = useApi('get', ApiUrl.findAllDataType)[1];
  const [getSearchData, { loading }] = usePreventRaceCondition(makeRequest);
  const $searchInputCtn = useRef<HTMLDivElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const activeSearch = () => setIsSearchActive(true);
  const deActiveSearch = () => setIsSearchActive(false);

  const handleSearchInputChange = async (value: string) => {
    setSearchValue(value);
    try {
      const params = { searchValue: value };
      const response = (await getSearchData(params)) as ISearchDataResponse;
      setSearchData(handleData(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = (searchResult: ISearchData[]) => {
    return searchResult.map((data) => ({
      ...data,
      avatar: 'avatar' in data ? handleImageUrl(data.avatar) : '',
      poster: 'poster' in data ? handleImageUrl(data.poster) : '',
    }));
  };

  const handleSearchInputChangeDebounced = debounce(handleSearchInputChange, 400);

  onOutSiteClick([$searchInputCtn], isSearchActive, deActiveSearch, null);

  return (
    <div
      ref={$searchInputCtn}
      className={`c-header-search-ctn flex-vertical-center ${
        isSearchActive === true ? 'active input-focus' : ''
      }`}
    >
      <input
        className="c-header-search__input"
        onChange={(e) => handleSearchInputChangeDebounced(e.target.value)}
        onClick={activeSearch}
        placeholder={placeHolderText}
      ></input>
      {isSearchActive && (
        <div className="c-header-search__result">
          {searchData &&
            !loading &&
            searchData.length > 0 &&
            searchData.map((data) => (
              <SearchResultItem key={data.dataType + data.id} {...data}></SearchResultItem>
            ))}
          {!loading && searchData && searchData.length == 0 && <NoResultFound></NoResultFound>}
          {loading && <PageLoader color="white"></PageLoader>}
        </div>
      )}
      <SearchIcon customStyle={{ color: 'rgba(0,0,0,0.54)' }}></SearchIcon>
    </div>
  );
};

export default HeaderSearchInput;
