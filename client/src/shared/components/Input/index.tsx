import React, { forwardRef } from 'react';

import './styles.scss';
import { BtnIcon } from 'shared/components/Icon';

interface IInputProps {
  [key: string]: any;
  preprendRender?: (...args: any[]) => JSX.Element;
  appendRender?: (...args: any[]) => JSX.Element;
  className?: string;
  type?: string;
  placeHolder?: string;
  onChange?: (...args: any[]) => any;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      type = 'text',
      placeHolder,
      preprendRender,
      appendRender,
      onChange = () => {},
      ...props
    }: IInputProps,
    ref,
  ) => {
    return (
      <div className={`c-input  ${className ? className : ''}`}>
        {preprendRender ? preprendRender() : <></>}
        <input
          className="c-input__input"
          type={type}
          ref={ref}
          placeholder={placeHolder}
          onChange={onChange}
          {...props}
        ></input>
        {appendRender ? appendRender() : <></>}
      </div>
    );
  },
);

interface InputIconPrepend extends IInputProps {
  code: string;
}

export const InputIconPrepend = forwardRef<HTMLInputElement, InputIconPrepend>(
  ({ code, ...rest }: InputIconPrepend, ref) => {
    return (
      <Input
        {...rest}
        ref={ref}
        preprendRender={() => (
          <div className="c-input__icon c-input__icon--prepend">
            <BtnIcon code={code}></BtnIcon>
          </div>
        )}
      ></Input>
    );
  },
);

export default Input;
