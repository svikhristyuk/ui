import { render } from '@testing-library/react';
import { FormikValues } from 'formik';
import React from 'react';

import { FormsContext, FormsProvider } from '../FormsProvider';
import { FormikEnhancedConfig, useFormikEnhanced } from '../useFormikEnhanced';

export function renderProvider<TValues extends FormikValues, TResponse>(
  defaultConfig: FormsContext,
  formConfig: FormikEnhancedConfig<TValues, TResponse>,
) {
  function Foo() {
    const { handleSubmit, errors } = useFormikEnhanced<TValues, TResponse>(
      formConfig,
    );

    return (
      <div>
        {errors.name}
        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    );
  }

  return render(
    <FormsProvider {...defaultConfig}>
      <Foo />
    </FormsProvider>,
  );
}
