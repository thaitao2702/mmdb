import React from 'react';

import SelectWithSearch, { IOption } from 'shared/components/SelectWithSearch';
import { InlineIcon } from 'shared/components/Icon';

import { getKeyFromEnum } from 'shared/utils';
import { Genre, GenreName } from 'shared/const';

interface ISelectGenreProps {
  [key: string]: any;
  selectedList: IOption[];
  onChange: (...args: any[]) => any;
}

const SelectGenre = ({ selectedList, onChange }: ISelectGenreProps) => {
  let optionsList: { name: string; id: number }[] = [];
  const genreKeys = getKeyFromEnum(Genre);
  genreKeys.forEach((key) => {
    optionsList.push({
      name: GenreName[key as keyof typeof GenreName],
      id: Genre[key as keyof typeof GenreName],
    });
  });

  return (
    <SelectWithSearch
      title="Genre"
      optionsList={optionsList}
      renderSelected={renderSelected}
      selectedList={selectedList}
      onChange={onChange}
    ></SelectWithSearch>
  );
};

interface IRenderSelected extends IOption {
  onClick: (...args: any[]) => any;
}

const renderSelected = ({ name, id, onClick }: IRenderSelected) => {
  return (
    <div className="c-selected-option c-selected-option--genre" key={id}>
      {name}
      <div className="c-selected-option__close-icon" onClick={onClick}>
        <InlineIcon code="times" _fontSize="15px" _top="8px"></InlineIcon>
      </div>
    </div>
  );
};

export default SelectGenre;
