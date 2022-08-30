import React, { forwardRef } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';

import { getStyleFromProps } from 'shared/utils/styles';
import './styles.scss';

interface ITextArea {
  [key: string]: any;
  className?: string;
  minRows?: number;
  placeholder?: string;
  onChange?: (...args: any[]) => any;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ className = '', onChange, minRows = 1, placeholder = '', ...rest }, ref) => {
    const customStyles = getStyleFromProps(rest);
    return (
      <div className={`c-text-area ${className}`}>
        <TextareaAutoSize
          ref={ref}
          minRows={minRows}
          placeholder={placeholder}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
          style={customStyles}
        ></TextareaAutoSize>
      </div>
    );
  },
);

export default TextArea;
