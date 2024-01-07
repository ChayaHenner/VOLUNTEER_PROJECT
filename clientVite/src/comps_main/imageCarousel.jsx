// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Box from '@mui/joy/Box';
// import Typography from '@mui/joy/Typography';
// import Card from '@mui/joy/Card';



//  const ImageCarousel = () => {
// //     const settings = {
// //         dots: true,
// //         infinite: true,
// //         speed: 20000, // Change speed as needed
// //         slidesToShow: 1,
// //         slidesToScroll: 1,
// //         autoplay: true,
// //         autoplaySpeed: 5000, // Change autoplay speed as needed
// //     };

// //     const images = [
// //         "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
// //         "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
// //         "https://images.pexels.com/photos/7551646/pexels-photo-7551646.jpeg?auto=compress&cs=tinysrgb&w=600"
// //     ];
// const data = [
//     {
//         src: "image1.jpg",
//         title: "Helping Hands",
//         description: "Helping Hands is a volunteer platform that connects people with opportunities to make a positive impact in their community. Join us in making a difference!"
//     },
//     {
//         src: "image2.jpg",
//         title: "Community Care Network",
//         description: "The Community Care Network is dedicated to providing support and assistance to those in need. Volunteer with us to spread kindness and compassion."
//     },
//     {
//         src: "image3.jpg",
//         title: "Hope Builders",
//         description: "Hope Builders is a volunteer organization committed to rebuilding lives and communities. Be a part of our team and bring hope to those who need it most."
//     },
//     {
//         src: "image4.jpg",
//         title: "Unity Volunteers",
//         description: "Unity Volunteers is all about fostering unity in diverse communities. Join us in creating a harmonious and inclusive society through volunteering."
//     },
//     {
//         src: "image5.jpg",
//         title: "Bright Futures Foundation",
//         description: "The Bright Futures Foundation focuses on providing educational opportunities for underprivileged youth. Volunteer with us to brighten the future of children in need."
//     },
//     {
//         src: "image6.jpg",
//         title: "Green Thumb Society",
//         description: "The Green Thumb Society is dedicated to environmental conservation and sustainable practices. Volunteer with us to make a positive impact on our planet."
//     },
//     {
//         src: "image7.jpg",
//         title: "Caring Companions",
//         description: "Caring Companions is a volunteer group that provides companionship and support to elderly individuals. Join us in spreading love and joy to senior citizens."
//     },
//     {
//         src: "image8.jpg",
//         title: "Youth Empowerment Alliance",
//         description: "The Youth Empowerment Alliance focuses on empowering young people to reach their full potential. Volunteer with us to inspire and uplift the next generation."
//     },
//     {
//         src: "image9.jpg",
//         title: "Food for All",
//         description: "Food for All is a volunteer initiative working towards ending hunger in local communities. Join us in the fight against food insecurity."
//     },
//     {
//         src: "image10.jpg",
//         title: "Animal Advocates",
//         description: "Animal Advocates is dedicated to the welfare of animals. Volunteer with us to be a voice for those who cannot speak for themselves."
//     },
//     {
//         src: "image11.jpg",
//         title: "Tech for Good",
//         description: "Tech for Good is a volunteer organization using technology for positive social impact. Join us in leveraging innovation for a better world."
//     },
//     {
//         src: "image12.jpg",
//         title: "Health Heroes",
//         description: "Health Heroes is a volunteer group focused on promoting health and wellness in communities. Be a health hero and join us in making a healthier world."
//     },
//     {
//         src: "image13.jpg",
//         title: "Artistic Hearts",
//         description: "Artistic Hearts is a volunteer community that uses art to inspire and bring joy to people's lives. Join us in expressing creativity for a good cause."
//     },
//     {
//         src: "image14.jpg",
//         title: "Global Builders",
//         description: "Global Builders is a volunteer organization dedicated to building homes and infrastructure in underserved regions. Join us in constructing a better world."
//     },
//     {
//         src: "image15.jpg",
//         title: "EmpowerU",
//         description: "EmpowerU is all about empowering individuals through education and mentorship. Volunteer with us to help others unlock their full potential."
//     }
// ];

// return (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: 1,
//         py: 1,
//         overflow: 'auto',
//         width: 343,
//         scrollSnapType: 'x mandatory',
//         '& > *': {
//           scrollSnapAlign: 'center',
//         },
//         '::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       {data.map((item) => (
//         <Card orientation="horizontal" size="sm" key={item.title} variant="outlined">
//           <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
//             <img
//               srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
//               src={`${item.src}?h=120&fit=crop&auto=format`}
//               alt={item.title}
//             />
//           </AspectRatio>
//           <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
//             <Typography level="title-md">{item.title}</Typography>
//             <Typography level="body-sm">{item.description}</Typography>
//           </Box>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default ImageCarousel;
