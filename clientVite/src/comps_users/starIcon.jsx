import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#8b5cf6',
  },
  '& .MuiRating-iconHover': {
    color: '#bfa9f2',
  },
});

export default function CustomizedRating(props) {
  const ratingValue = props.rating;

  return (
    <Box className="flex">
      <StyledRating
        name="read-only"
        value={ratingValue}
        getLabelText={(value = number) => `${value} Heart ${value !== 1 ? 's' : ''}`}
        precision={0.5} readOnly
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    </Box>
  );
}
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Typography from '@mui/material/Typography';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#8b5cf6',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#bfa9f2',
//   },
// });

// export default function CustomizedRating(props) {
//   const ratingValue = props.rating

//   return (
//     <Box className="flex">
//       <StyledRating
//         value={ratingValue}
//         getLabelText={(value = number) => `${value} Heart ${value !== 1 ? 's' : ''}`}
//         precision={0.5}
//         icon={<FavoriteIcon fontSize="inherit" />}
//         emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
//       />
//       <div component="legend">{ratingValue}</div>
//     </Box>
//   );
// }
