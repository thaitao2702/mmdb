import React, { useState } from 'react';
import { debounce } from 'lodash';

import SelectWithSearch from 'shared/components/SelectWithSearch';
import { InlineIcon } from 'shared/components/Icon';

import { useApi } from 'shared/hooks/api';
import usePreventRaceCondition from 'shared/hooks/api/preventRaceCondition';
import { ApiUrl } from 'shared/config/apiUrl';
import { handleImageUrl } from 'shared/utils';

interface ISelectDirectorProps {
  selectedList?: IDirector[];
  onChange?: (...args: any[]) => any;
}

interface IGetDirectorsResponse {
  success: boolean;
  data: IDirector[];
}

export interface IDirector {
  avatar: string;
  id: number | string;
  name: string;
}

const SelectDirector = ({ selectedList, onChange }: ISelectDirectorProps) => {
  const [optionsList, setOptionsList] = useState<any[]>([]);
  const makeRequest = useApi('get', ApiUrl.getDirectorByName)[1];
  const [getDirectors, { loading }] = usePreventRaceCondition(makeRequest);

  const handleSearchInputChange = async (value: string) => {
    const apiParams = { searchValue: value };
    if (value) {
      const response = (await getDirectors(apiParams)) as IGetDirectorsResponse;
      if (response.success && response.data) {
        setOptionsList(response.data);
      }
    }
  };

  const handleSearchInputChangeDebounced = debounce(handleSearchInputChange, 400);

  return (
    <SelectWithSearch
      onInputChange={handleSearchInputChangeDebounced}
      title="Director"
      isLoading={loading}
      isMulti={false}
      isGetOptionsFromApi={true}
      optionsList={optionsList}
      selectedList={selectedList}
      onChange={onChange}
      renderSelected={renderSelectedDirector}
    ></SelectWithSearch>
  );
};

interface IRenderSelectedDirectorProps extends IDirector {
  onClick: (...args: any[]) => any;
}
const renderSelectedDirector = ({ name, id, avatar, onClick }: IRenderSelectedDirectorProps) => {
  return (
    <div className="c-selected-option c-selected-option--director" key={id}>
      <img src={handleImageUrl(avatar)} className="mr-9" style={{ height: '100%' }}></img>
      {name}
      <div className="c-selected-option__close-icon" onClick={() => onClick(id)}>
        <InlineIcon code="times" _fontSize="15px" _top="8px"></InlineIcon>
      </div>
    </div>
  );
};

export default SelectDirector;
