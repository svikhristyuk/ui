import { action } from '@storybook/addon-actions';
import {
  FormikCheckboxField,
  FormikDateField,
  FormikPhoneField,
  FormikRadioGroupField,
  FormikTextField,
  useFormikEnhanced,
} from '@superdispatch/forms';
import { PhoneNumber } from '@superdispatch/phones';
import {
  Button,
  Inline,
  RadioField,
  Stack,
  useSnackbarStack,
} from '@superdispatch/ui';
import { random } from 'faker';
import { Form, FormikErrors, FormikProvider } from 'formik';
import React from 'react';

interface FormValues {
  first_name: string;
  last_name: string;
  position: string;
  date_of_birth: null | Date;
  phone: null | PhoneNumber;
  is_single: boolean;
}

export default function TextFieldDemo() {
  const { addSnackbar } = useSnackbarStack();
  const form = useFormikEnhanced<FormValues, void>({
    initialValues: {
      first_name: '',
      last_name: '',
      position: 'designer',
      date_of_birth: null,
      phone: null,
      is_single: true,
    },
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};

      if (!values.date_of_birth) {
        errors.date_of_birth = 'Date is required';
      }

      if (!values.position) {
        errors.position = 'Position is required';
      }

      if (!values.first_name) {
        errors.first_name = 'First name is required';
      }

      if (!values.last_name) {
        errors.last_name = 'Last name is required';
      }

      if (!values.phone) {
        errors.phone = 'Phone is required';
      }

      return errors;
    },
    onSubmit: (values) => {
      action('Form submit')({ values });
      return Promise.resolve();
    },
    onSubmitSuccess: (response, values) => {
      action('Form submit success')({ response, values });

      const adj = ['great', 'awesome', 'beautiful', 'strong', 'cleaver'];
      addSnackbar(`${values.first_name} is ${random.arrayElement(adj)}`);
    },
  });

  return (
    <FormikProvider value={form}>
      <Form>
        <Stack space={2}>
          <Inline space={2}>
            <FormikTextField name="first_name" label="First name" />

            <FormikTextField name="last_name" label="Last name" />
          </Inline>

          <FormikDateField
            name="date_of_birth"
            label="Date of birth"
            validate={(value) => {
              if (!value) {
                return 'Please enter a date of birth';
              }

              if (value > new Date()) {
                return "Date of birth can't be in future";
              }

              return undefined;
            }}
          />

          <FormikPhoneField name="phone" label="Pone number" />

          <FormikCheckboxField name="is_single" label="Are you single?" />

          <FormikRadioGroupField name="position" label="Your position">
            <RadioField label="Designer" value="designer" />
            <RadioField label="Frontend Developer" value="frontend_developer" />
            <RadioField label="Backend Developer" value="backend_developer" />
            <RadioField label="QA" value="qa" />
            <RadioField label="CTO" value="cto" />
            <RadioField label="CEO" value="ceo" />
          </FormikRadioGroupField>

          <Inline space={2}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => {
                action('Form reset')();
                form.resetForm({});
              }}
            >
              Reset
            </Button>
          </Inline>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
