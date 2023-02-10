import { Box, Chip } from '@mui/material';
import React, { type FC } from 'react';

export interface TagProps {
  data: string[];
  showAll?: boolean;
  tagsToShow?: number;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  noTagMessage?: string;
  margin?: number;
}

const Tag: FC<TagProps> = (props) => {
  const { data, showAll, tagsToShow, size, variant, color, noTagMessage, margin } = props;

  if (!data) return null;
  if (data.length === 0) return <div>{noTagMessage}</div>;

  if (data && !showAll) {
    data.splice(tagsToShow ?? 1, data.length - (tagsToShow ?? 1));
  }

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      {data.map((tag) => (
        <Chip key={tag} label={tag} size={size} variant={variant} color={color} style={{ margin }} />
      ))}
    </Box>
  );
};

Tag.defaultProps = {
  data: ['pippo', 'pluto', 'paperino'],
  showAll: false,
  tagsToShow: 1,
  size: 'small',
  variant: 'outlined',
  color: 'success',
  noTagMessage: 'No tags to show',
};

export default Tag;
