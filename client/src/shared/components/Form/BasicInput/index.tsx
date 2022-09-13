import React, { forwardRef } from 'react';
import { Field, FieldProps } from 'formik';
import { uniqueId } from 'lodash';

import { InlineIcon } from 'shared/components/Icon';
import './styles.scss';

interface IInputProps {
  name: string;
  label?: string;
  tooltip?: string;
  type?: string;
  className?: string;
}

type IRef = HTMLInputElement;

const BasicInput = forwardRef<IRef, IInputProps>(
  ({ name, label, tooltip, type = 'text', className = '' }: IInputProps, ref) => {
    const fieldId = uniqueId('field-id-');
    return (
      <Field name={name}>
        {({ field, form: { touched, errors } }: FieldProps) => (
          <div className={`basic-input ${className}`}>
            {label && (
              <label htmlFor={fieldId} className="basic-input__label">
                {label}
              </label>
            )}
            <input
              className={`basic-input__field ${touched[name] && errors[name] ? 'input-error' : ''}`}
              id={fieldId}
              type={type}
              ref={ref}
              {...field}
            ></input>
            {tooltip && (
              <div className="basic-input__tooltip">
                <InlineIcon
                  code="info"
                  _color="#70bad5"
                  _fontSize="10px"
                  className="mr-6"
                ></InlineIcon>
                {tooltip}
              </div>
            )}
            {touched[name] && errors[name] && (
              <div className="basic-input__err">
                <InlineIcon code="exclamation"></InlineIcon>
                {errors[name] as string}
              </div>
            )}
          </div>
        )}
      </Field>
    );
  },
);

export default BasicInput;
