import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import StarsIcon from '@mui/icons-material/Stars';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useEffect, useMemo, useState } from 'react';
import type { ListRowProps } from 'react-virtualized';
import { List } from 'react-virtualized';

import { distanceFunction, generateColorMap } from './closest-colors';
import useIsMobile from './utils';

export interface ColorPickerProps {
  onSelectedColor: (color: string) => void;
  colorsInStock: string[];
  showCloestColors: boolean;
}
export interface IColor {
  R: number;
  G: number;
  B: number;
  name: string;
  english: string;
  italian: string;
}
export interface IColorWithClosest {
  original: IColor;
  closestColors: { color: IColor; distance: number }[];
}
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { colorsInStock, showCloestColors, onSelectedColor } = props;
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const [openPicker, setOpenPicker] = useState(false);
  const isMobile = useIsMobile();

  const allColorsWithClosest = useMemo(() => {
    const colorMap = generateColorMap();
    return colorMap;
  }, []);

  const filteredColors = useMemo(() => {
    return allColorsWithClosest
      .filter(
        (color) =>
          color.original.name.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          color.original.italian.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          color.original.english.toLowerCase().includes(debouncedSearchInput.toLowerCase()),
      )
      .map((color) => color.original.name);
  }, [debouncedSearchInput, showCloestColors, colorsInStock]);

  const [selectedColor, setSelectedColor] = useState<{
    selectedColor: string;
    name: string;
    textColor: string;
  }>({ selectedColor: '', textColor: '', name: '' });

  const handleSelectColor = ({
    selectedColor: color,
    name,
    textColor,
  }: {
    selectedColor: string;
    name: string;
    textColor: string;
  }) => {
    setSelectedColor({ selectedColor: color, name, textColor });
    setOpenPicker(false);
    onSelectedColor(name);
  };

  const handleClose = () => {
    setOpenPicker(false);
  };

  const [buttonStyle, setButtonStyle] = useState<'contained' | 'text'>('contained');

  const renderStar = (color: string) => {
    if (!colorsInStock) return;
    const iconSize = isMobile ? 12 : 18;

    if (colorsInStock && colorsInStock.includes(color)) {
      return <StarsIcon sx={{ fontSize: iconSize }} />;
    }
    return <></>;
  };

  const renderPicker = () => (
    <Dialog open={openPicker} onClose={handleClose} fullScreen={isMobile}>
      <DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Search.."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="Clear search input" onClick={() => setSearchInput('')}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center" justifyContent="flex-end">
            {showCloestColors && (
              <Switch
                value={buttonStyle === 'contained'}
                onClick={() => {
                  switch (buttonStyle) {
                    case 'contained':
                      setButtonStyle('text');
                      break;
                    case 'text':
                      setButtonStyle('contained');
                      break;
                  }
                }}
              />
            )}
            <IconButton onClick={() => setOpenPicker(!openPicker)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={1}>
            <List
              width={600}
              height={800}
              rowCount={filteredColors.length}
              rowHeight={showCloestColors ? 252 : 99}
              rowRenderer={({ index, style }: ListRowProps) => {
                const color = filteredColors[index];
                return (
                  <div key={index} style={style}>
                    {renderCard(color)}
                  </div>
                );
              }}
            />
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );

  const renderCard = (name: string) => {
    const color = allColorsWithClosest.find((colorWithClosest) => colorWithClosest.original.name === name);
    if (!color) {
      return null;
    }
    const textColorRgb: IColor = {
      R: 0,
      G: 0,
      B: 0,
      name: '',
      english: '',
      italian: '',
    };
    let textColor = `rgb(${textColorRgb.R}, ${textColorRgb.G}, ${textColorRgb.B})`;
    const colorDistance = distanceFunction(
      {
        R: color.original.R,
        G: color.original.G,
        B: color.original.B,
        name: '',
        english: '',
        italian: '',
      },
      textColorRgb,
    );
    if (colorDistance < 250) {
      textColor = `rgb(255,255,255)`;
    }
    const res = (
      <Grid item xs={12} key={color.original.name}>
        <Card
          key={color.original.name}
          variant="outlined"
          style={{
            backgroundColor: `rgb(${color?.original.R}, ${color?.original.G}, ${color?.original.B})`,
          }}
        >
          <CardContent>
            <MenuItem
              onClick={() =>
                handleSelectColor({
                  name: color?.original.name,
                  selectedColor: `rgb(${color?.original.R}, ${color?.original.G}, ${color?.original.B})`,
                  textColor,
                })
              }
            >
              <Grid container spacing={1}>
                <Grid item xs={11} alignItems={'flex-start'}>
                  <Typography fontSize={20} color={textColor}>
                    {color?.original.name}
                  </Typography>
                  <Typography fontSize={10} color={textColor}>
                    {color?.original.english}
                  </Typography>
                </Grid>
                <Grid item xs={1} display={'flex'} alignContent={'flex-end'} alignItems={'center'}>
                  {renderStar(color?.original.name)}
                </Grid>
              </Grid>
            </MenuItem>
            {showCloestColors && (
              <>
                <Divider style={{ marginBottom: 10 }} />
                <Grid container spacing={1} key={color.original.name + '-cloest'}>
                  {color?.closestColors.map((closestColors) => {
                    return renderAlternativesColor(closestColors, textColor);
                  })}
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
    return res;
  };

  const buttonWidth = isMobile ? '100px' : '160px';
  const fontSize = isMobile ? 9 : 14;

  const renderAlternativesColor = (closestColors: any, textColor: string) => {
    const res = (
      <Grid item xs={4} key={closestColors.color.name}>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <Button
              style={{
                backgroundColor: `rgb(${closestColors.color.R}, ${closestColors.color.G}, ${closestColors.color.B})`,
                color: textColor,
                width: buttonWidth,
                height: '40px',
              }}
              variant={buttonStyle}
              onClick={() => {
                handleSelectColor({
                  name: closestColors.color.name,
                  selectedColor: `rgb(${closestColors.color.R}, ${closestColors.color.G}, ${closestColors.color.B})`,
                  textColor,
                });
              }}
            // endIcon={renderStar(closestColors.color.name)}
            >
              <Grid container spacing={0}>
                <Grid item xs={11}>
                  <Typography fontSize={fontSize} color={textColor}>
                    {closestColors.color.name}
                  </Typography>
                  <Typography fontSize={10} color={textColor}>
                    {closestColors.distance.toFixed()}
                  </Typography>
                </Grid>
                <Grid item xs={1} display="flex" alignContent={'flex-end'} alignItems={'center'}>
                  {renderStar(closestColors.color.name)}
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
    return res;
  };

  return (
    filteredColors && (
      <>
        <Button
          value={selectedColor.name || 'Seleziona colore'}
          variant={'contained'}
          style={{
            backgroundColor: selectedColor.selectedColor,
            color: selectedColor.textColor,
          }}
          onClick={() => {
            if (selectedColor.name) {
              setSearchInput(selectedColor.name);
            }
            setOpenPicker(!openPicker);
          }}
        >
          {selectedColor.name || 'Seleziona colore'}
        </Button>
        {openPicker && renderPicker()}
      </>
    )
  );
};

ColorPicker.defaultProps = {
  showCloestColors: true,
  colorsInStock: ['RAL 1000', 'S 0500-N', 'S 0505-G90Y'],
};

export default memo(ColorPicker);
