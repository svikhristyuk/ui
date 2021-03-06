import { TextField } from '@material-ui/core';
import { PhoneText } from '@superdispatch/phones';
import { Stack } from '@superdispatch/ui';
import React, { useState } from 'react';

export default function PhoneTextDemo() {
  const [phone, setPhone] = useState('+1 (201) 555-0123');
  const [fallback, setFallback] = useState('Invalid Phone Number');

  return (
    <Stack space={2}>
      <TextField
        label="Raw"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <TextField
        label="Fallback Text"
        value={fallback}
        onChange={(event) => setFallback(event.target.value)}
      />

      <PhoneText phone={phone} fallback={fallback} />
    </Stack>
  );
}
