import React, { useRef, useLayoutEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';

import { InlineIcon } from 'shared/components/Icon';

import './styles.scss';

interface IReleaseDateProps {
  date?: string | Date | null;
  onChange?: (...args: any[]) => any;
}

type IOnChange = NonNullable<Flatpickr['props']['onChange']>;

const SelectReleaseDate = ({ date: propDate, onChange }: IReleaseDateProps) => {
  const date = propDate ? new Date(propDate) : null;
  const prevDate = useRef(date);
  const $flatpickrRef = useRef<Flatpickr>(null);

  const addDate = () => {
    const date = new Date();
    if (onChange) onChange(date);
  };

  const handleChange: IOnChange = function ([date]) {
    const gmt0Date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); // convert to GMT0
    console.log('noTimeDate', gmt0Date);
    if (onChange) onChange(gmt0Date);
  };

  useLayoutEffect(() => {
    if (!prevDate.current && $flatpickrRef.current) {
      $flatpickrRef.current.flatpickr.open();
      prevDate.current = date;
    }
  }, [date]);

  return (
    <div className="c-select-release-date flex-vertical-center">
      <span className="c-select-release-date__title mr-15">Release Date</span>
      {!date && (
        <span className="c-select-release-date__add-btn" onClick={addDate}>
          <InlineIcon _top="2px" code="plus"></InlineIcon> Add
        </span>
      )}
      {date && (
        <Flatpickr
          data-enable-time
          ref={$flatpickrRef}
          value={date}
          className="c-select-release-date__date"
          onChange={handleChange}
          options={{ dateFormat: 'M d, Y', enableTime: false }}
        />
      )}
    </div>
  );
};

export default SelectReleaseDate;
