import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  Switch,
  TextField,
} from '@material-ui/core';
import { Stack } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const options = ['one', 'two', 'three'];

export default function SwitchDemo() {
  const [selected, setSelected] = useState(new Set<string>());
  const errorMessage =
    selected.size === 0
      ? undefined
      : !selected.has('two')
      ? 'It’s not two'
      : selected.size > 1
      ? 'It’s not only two'
      : undefined;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Stack space={2}>
      <FormControl>
        <FormLabel>Label Position</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel label="Right Label" control={<Switch />} />

          <FormControlLabel
            label="Left Label"
            labelPlacement="start"
            control={<Switch />}
          />
        </FormGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Readonly</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel checked={true} label="On" control={<Switch />} />

          <FormControlLabel checked={false} label="Off" control={<Switch />} />
        </FormGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Disabled</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            label="On"
            checked={true}
            disabled={true}
            control={<Switch />}
          />

          <FormControlLabel
            label="Off"
            checked={false}
            disabled={true}
            control={<Switch />}
          />
        </FormGroup>
      </FormControl>

      <FormControl error={!!errorMessage}>
        <FormLabel>Vertical</FormLabel>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              label={startCase(option)}
              checked={selected.has(option)}
              onChange={(_, checked) =>
                setSelected((prev) => {
                  const next = new Set<string>(prev);
                  if (checked) {
                    next.add(option);
                  } else {
                    next.delete(option);
                  }
                  return next;
                })
              }
              control={<Switch />}
            />
          ))}
        </FormGroup>

        {!errorMessage ? (
          <FormHelperText>Select two</FormHelperText>
        ) : (
          <FormHelperText>{errorMessage}</FormHelperText>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>Inline Form</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            label="Radio"
            control={<Radio />}
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
          <FormControlLabel
            label="Checkbox"
            control={<Checkbox />}
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
          <FormControlLabel
            label="Switch"
            control={<Switch />}
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />

          <TextField placeholder="Text Field" />
        </FormGroup>
      </FormControl>
    </Stack>
  );
}
