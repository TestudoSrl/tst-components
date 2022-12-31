import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { distanceFunction } from './closest-colors'
import { allColorsWithClosest } from './colors'

export interface ColorPickerProps {
  title: string
  onSelected: (color: string) => void
}

export interface IColor {
  R: number
  G: number
  B: number
  name: string
  english: string
  italian: string
}

export interface IColorWithClosest {
  original: IColor
  closestColors: { color: IColor; distance: number }[]
}

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { title, onSelected } = props
  const [searchInput, setSearchInput] = useState<string>('')
  const [limit, setLimit] = useState<number>(10)
  const debouncedSearchInput = useDebounce(searchInput, 300)
  const [openPicker, setOpenPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState<{
    selectedColor: string
    name: string
    textColor: string
  }>({ selectedColor: '', textColor: '', name: '' })

  const handleSelectColor = (selectedColorObject: {
    selectedColor: string
    name: string
    textColor: string
  }) => {
    setSelectedColor(selectedColorObject)
    setOpenPicker(false)
    onSelected(selectedColorObject.selectedColor)
  }

  const filteredColors = allColorsWithClosest
    .filter(
      (color) =>
        color.key.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
        color.value.original.italian
          .toLowerCase()
          .includes(debouncedSearchInput.toLowerCase()) ||
        color.value.original.english
          .toLowerCase()
          .includes(debouncedSearchInput.toLowerCase())
    )
    .slice(0, limit)
    .map((color) => color.key)

  const handleClose = () => {
    setOpenPicker(false)
  }

  const [buttonStyle, setButtonStyle] = useState<'contained' | 'text'>(
    'contained'
  )

  const renderPicker = () => (
    <Dialog open={openPicker} onClose={handleClose}>
      <DialogTitle>
        {title}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={9}>
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
                        <IconButton
                          aria-label="Clear search input"
                          onClick={() => setSearchInput('')}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Limit"
                  value={limit}
                  onChange={(event) => setLimit(Number(event.target.value))}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Switch
              value={buttonStyle === 'contained'}
              onClick={() => {
                switch (buttonStyle) {
                  case 'contained':
                    setButtonStyle('text')
                    break
                  case 'text':
                    setButtonStyle('contained')
                    break
                }
              }}
            />
            <IconButton onClick={() => setOpenPicker(!openPicker)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <Box>
            <Grid container spacing={5}>
              {filteredColors.map((name) => {
                return renderCard(name)
              })}
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )

  const renderCard = (name: string) => {
    const color = allColorsWithClosest.find((findedColor) => findedColor.key === name)
    if (!color) {
      return null
    }

    const textColorRgb: IColor = {
      R: 0,
      G: 0,
      B: 0,
      name: 'textColor',
      english: 'textColor',
      italian: 'textColor',
    }
    let textColor = `rgb(${textColorRgb.R}, ${textColorRgb.G}, ${textColorRgb.B})`

    const colorDistance = distanceFunction(
      {
        R: color.value.original.R,
        G: color.value.original.G,
        B: color.value.original.B,
        name: '',
        english: '',
        italian: '',
      },
      textColorRgb
    )

    if (colorDistance < 250) {
      textColor = `rgb(255,255,255)`
    }

    const res = (
      <Grid item xs={12}>
        <Card
          variant="outlined"
          style={{
            backgroundColor: `rgb(${color?.value.original.R}, ${color?.value.original.G}, ${color?.value.original.B})`,
          }}
        >
          <CardContent>
            <Button
              style={{
                backgroundColor: `rgb(${color?.value.original.R}, ${color?.value.original.G}, ${color?.value.original.B})`,
                color: textColor,
                width: '100%',
              }}
              size="large"
              variant="text"
              onClick={() => {
                handleSelectColor({
                  name: color?.value.original.name,
                  selectedColor: `rgb(${color?.value.original.R}, ${color?.value.original.G}, ${color?.value.original.B})`,
                  textColor,
                })
              }}
              endIcon={color?.value.original.english}
            >
              <Typography fontSize={20} color={textColor}>
                {color?.value.original.name}
              </Typography>
            </Button>

            <Divider style={{ marginBottom: 10 }} />
            <Grid container spacing={1}>
              {color?.value.closestColors.map((closestColors) => {
                return renderAlternativesColor(closestColors, textColor)
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
    return res
  }

  const renderAlternativesColor = (closestColors: any, textColor: string) => {
    const res = (
      <Grid item xs={4}>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <Button
              style={{
                backgroundColor: `rgb(${closestColors.color.R}, ${closestColors.color.G}, ${closestColors.color.B})`,
                color: textColor,
                width: '160px',
                height: '20px',
              }}
              variant={buttonStyle}
              endIcon={
                <Typography style={{ fontSize: 11 }} color={textColor}>
                  {closestColors.distance.toFixed()}
                </Typography>
              }
              onClick={() => {
                handleSelectColor({
                  name: closestColors.color.name,
                  selectedColor: `rgb(${closestColors.color.R}, ${closestColors.color.G}, ${closestColors.color.B})`,
                  textColor,
                })
              }}
            >
              {closestColors.color.name}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
    return res
  }

  return (
    <>
      {renderPicker()}
      <Button
        style={{
          backgroundColor: selectedColor.selectedColor,
          color: selectedColor.textColor,
        }}
        onClick={() => setOpenPicker(!openPicker)}
        variant="contained"
      >
        {selectedColor.name || 'Seleziona colore'}
      </Button>
    </>
  )
}

export default ColorPicker
