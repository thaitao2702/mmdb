import { useState } from 'react';

interface ISelectOption {
  id: number;
  name: string;
}

function useSelect<T extends ISelectOption>(
  inputList: T[],
  isMulti: boolean,
  isOpenInitial: boolean = false,
  isRemoveOnSelected: boolean = true,
) {
  const [selectedList, setSelectedList] = useState<T[]>([]);
  const [isOptionListOpen, setIsOptionListOpen] = useState(isOpenInitial);
  const [optionsList, setOptionsList] = useState<T[]>(inputList);
  const removeSelectedOption = (removedItem: T) => {
    setSelectedList((prev) => prev.filter((selectedItem) => selectedItem.id !== removedItem.id));
    if (isRemoveOnSelected)
      setOptionsList((prev) => {
        if (prev.some((item) => item.id === removedItem.id)) return prev;
        else return [...prev, removedItem];
      });
  };

  const selectOption = (selectedItem: T) => {
    if (isMulti) {
      if (selectedList.some((item) => item.id === selectedItem.id)) return;
      else setSelectedList((prev) => [...prev, selectedItem]);
    } else {
      setSelectedList([selectedItem]);
    }
    if (isRemoveOnSelected)
      setOptionsList((prev) => prev.filter((item) => item.id !== selectedItem.id));
  };

  const openOptionList = () => setIsOptionListOpen(true);
  const closeOptionList = () => setIsOptionListOpen(false);

  return {
    selectedList,
    selectOption,
    removeSelectedOption,
    isOptionListOpen,
    openOptionList,
    closeOptionList,
    optionsList,
    setOptionsList,
  };
}

export default useSelect;
