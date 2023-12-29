import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#8b5cf6',
  },
  '& .MuiRating-iconHover': {
    color: '#bfa9f2',
  },
});

export default function CustomizedRating(props) {
  // const [ratingValue, setRatingValue] = React.useState(3.5); // Initialize state for the rating value
  const ratingValue = props.ratingValue
  const setRatingValue = props.setRatingValue
  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue); // Update the state with the new rating value
  };

  return (
    <Box className="flex">
      <StyledRating
        value={ratingValue} // Use the state variable as the value
        onChange={handleRatingChange} // Handle changes to the rating value
        getLabelText={(value = number) => `${value} Heart ${value !== 1 ? 's' : ''}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
      <div component="legend">{ratingValue}</div>
    </Box>
  );
}
