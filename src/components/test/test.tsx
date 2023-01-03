import { Button } from '@mui/material';
import React, { type FC } from 'react';
import { updateAllColors } from './generateColors';

export interface TestProps {
  data: string[];
}

const Test: FC<TestProps> = () => {

  return (
    <Button
      variant="contained"
      onClick={() => { updateAllColors() }}
    >
      Start
    </Button>
  );
};


export default Test;