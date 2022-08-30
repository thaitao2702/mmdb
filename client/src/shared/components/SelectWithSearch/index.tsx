import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';

import './styles.scss';

import { InlineIcon } from 'shared/components/Icon';
import PageLoader from 'shared/components/PageLoader';
import NoResultFound from 'shared/components/NoResultFound';

import useOnOutsideClick from 'shared/hooks/onOutSiteClick';

interface ISelectWithSearchProps {
  [key: string]: any;
  title?: string;
  placeHolderText?: string;
  optionsList?: IOption[];
  isMulti?: boolean;
  isGetOptionsFromApi?: boolean;
  selectedList?: IOption[];
  onChange?: (...args: any) => any;
  renderSelected?: (...args: any[]) => JSX.Element;
  renderOptions?: (...args: any[]) => JSX.Element;
}

export interface IOption {
  [key: string]: any;
  name: string;
  id: number | string;
}

const SelectWithSearch = ({
  title,
  placeHolderText,
  isLoading,
  className,
  isMulti = true,
  isGetOptionsFromApi = false,
  optionsList = [],
  onInputChange = () => {},
  onChange,
  renderSelected,
  renderOptions,
  selectedList: propSelectedList,
}: ISelectWithSearchProps) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stateSelectedList, setStateSelectedList] = useState<IOption[]>([]);
  const isControlled = propSelectedList != undefined;
  const $ctnRef = useRef<HTMLDivElement>(null);
  const $inputRef = useRef<HTMLInputElement>(null);

  const selectedList = isControlled ? propSelectedList : stateSelectedList;

  const isDisplayAddBtn = !selectedList || isMulti || (!isMulti && selectedList.length == 0);

  const closeOptionList = useCallback(() => {
    setSearchValue('');
    setIsOptionListOpen(false);
  }, []);

  useOnOutsideClick([$ctnRef], isOptionListOpen, closeOptionList, null);

  useLayoutEffect(() => {
    if (isOptionListOpen) $inputRef.current?.focus();
  }, [isOptionListOpen]);

  const removeSelectedOption = (item: IOption) => {
    if (isControlled && onChange)
      onChange((selectedList || []).filter((selected) => selected.id !== item.id));
    else setStateSelectedList((prev) => prev.filter((selected) => selected.id !== item.id));
  };

  const openOptionList = () => {
    $inputRef.current?.focus();
    setIsOptionListOpen(true);
  };

  const selectOption = (item: IOption) => {
    if (isControlled && onChange) {
      if (isMulti) onChange([...(selectedList || []), item]);
      else onChange([item]);
    } else {
      if (isMulti) setStateSelectedList((prev) => [...prev, item]);
      else setStateSelectedList([item]);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onInputChange(value);
  };

  const filterOptionsListBySearch = (list: IOption[]) => {
    if (isGetOptionsFromApi) return list;
    return list.filter((item) =>
      item.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
    );
  };

  const filterOptionsListByRemoved = (list: IOption[]) => {
    const selectedIds = (selectedList || []).map((item) => item.id);
    return list.filter((item) => selectedIds.indexOf(item.id) === -1);
  };

  const filteredOptionsList = filterOptionsListByRemoved(filterOptionsListBySearch(optionsList));

  return (
    <div className={`c-select-with-search ${className ? className : ''}`}>
      <div className="c-select-with-search__ctn flex-vertical-center" ref={$ctnRef}>
        {title && <span className="c-select-with-search__title mr-6">{title}</span>}
        {placeHolderText && selectedList && selectedList.length == 0 && (
          <span className="c-select-with-search__place-holder-text">{placeHolderText}</span>
        )}
        {selectedList &&
          selectedList.length > 0 &&
          selectedList.map((item) =>
            renderSelected ? (
              renderSelected({ ...item, onClick: () => removeSelectedOption(item) })
            ) : (
              <SelectedItem
                key={item.id}
                onClick={() => {
                  removeSelectedOption(item);
                }}
                {...item}
              />
            ),
          )}
        {isDisplayAddBtn && (
          <span className="c-select-with-search__add-btn" onClick={() => openOptionList()}>
            <InlineIcon _top="2px" code="plus"></InlineIcon> Add
          </span>
        )}
        {isOptionListOpen && (
          <div className="c-select-with-search__options">
            <input
              placeholder="search"
              className="c-select-with-search__search-input flex-vertical-center"
              ref={$inputRef}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="c-select-with-search__options-ctn">
              {!isLoading &&
                filteredOptionsList.length > 0 &&
                filteredOptionsList.map((option) =>
                  renderOptions ? (
                    renderOptions({ ...option, onClick: () => selectOption(option) })
                  ) : (
                    <div
                      className="option flex-vertical-center"
                      onClick={() => selectOption(option)}
                      key={option.id}
                    >
                      {option.name}
                    </div>
                  ),
                )}
              {!isLoading && searchValue && filteredOptionsList.length === 0 && <NoResultFound />}
              {isLoading && <PageLoader></PageLoader>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ISelectedItemProps {
  name: string;
  id: number | string;
  onClick: (...args: any[]) => any;
}

const SelectedItem = ({ name, id, onClick }: ISelectedItemProps) => {
  return (
    <div className="c-selected-option" key={id}>
      {name}
      <div className="c-selected-option__close-icon" onClick={() => onClick(id)}>
        <InlineIcon code="times" _fontSize="15px" _top="8px"></InlineIcon>
      </div>
    </div>
  );
};

export default SelectWithSearch;
