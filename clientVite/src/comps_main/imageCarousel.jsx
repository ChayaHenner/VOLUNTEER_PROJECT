import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const ImageCarousel = () => {
    const data = [
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703974502413?alt=media&token=4d64288e-46ab-4bc0-aafa-cfe28593254a",
            title: "Helping Hands",
            description: "Helping Hands is a volunteer platform that connects people with opportunities to make a positive impact in their community. Join us in making a difference!"
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704041692114?alt=media&token=63178ccf-b074-435a-94c4-e6a9bc76a794",
            title: "Community Care Network",
            description: "The Community Care Network is dedicated to providing support and assistance to those in need. Volunteer with us to spread kindness and compassion."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703748564395?alt=media&token=39ca1903-3cab-493f-b43b-c51a17145a49",
            title: "Hope Builders",
            description: "Hope Builders is a volunteer organization committed to rebuilding lives and communities. Be a part of our team and bring hope to those who need it most."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703851016927?alt=media&token=b84ff956-2557-4faf-8ad9-7c4993facc9d",
            title: "Unity Volunteers",
            description: "Unity Volunteers is all about fostering unity in diverse communities. Join us in creating a harmonious and inclusive society through volunteering."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704635655383?alt=media&token=235cd4b5-ba86-43c4-a825-e34cd5ca5058",
            title: "Bright Futures Foundation",
            description: "The Bright Futures Foundation focuses on providing educational opportunities for underprivileged youth. Volunteer with us to brighten the future of children in need."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703974502413?alt=media&token=4d64288e-46ab-4bc0-aafa-cfe28593254a",
            title: "Green Thumb Society",
            description: "The Green Thumb Society is dedicated to environmental conservation and sustainable practices. Volunteer with us to make a positive impact on our planet."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704664309709?alt=media",
            title: "Caring Companions",
            description: "Caring Companions is a volunteer group that provides companionship and support to elderly individuals. Join us in spreading love and joy to senior citizens."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704662433480?alt=media&token=c429f42c-d7bb-4e82-af98-c26ee6787ce2",
            title: "Youth Empowerment Alliance",
            description: "The Youth Empowerment Alliance focuses on empowering young people to reach their full potential. Volunteer with us to inspire and uplift the next generation."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704662440739?alt=media&token=45078fe5-6796-4a67-aa7d-efd6ed8e585d",
            title: "Food for All",
            description: "Food for All is a volunteer initiative working towards ending hunger in local communities. Join us in the fight against food insecurity."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704699393282?alt=media&token=0cbd6d22-67c4-4772-80d5-f5566399e85d",
            title: "Animal Advocates",
            description: "Animal Advocates is dedicated to the welfare of animals. Volunteer with us to be a voice for those who cannot speak for themselves."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704700939537?alt=media&token=89db946d-e0dc-406f-9846-92c197598342",
            title: "Tech for Good",
            description: "Tech for Good is a volunteer organization using technology for positive social impact. Join us in leveraging innovation for a better world."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704699393282?alt=media&token=0cbd6d22-67c4-4772-80d5-f5566399e85d",
            title: "Health Heroes",
            description: "Health Heroes is a volunteer group focused on promoting health and wellness in communities. Be a health hero and join us in making a healthier world."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703748564395?alt=media&token=39ca1903-3cab-493f-b43b-c51a17145a49",
            title: "Artistic Hearts",
            description: "Artistic Hearts is a volunteer community that uses art to inspire and bring joy to people's lives. Join us in expressing creativity for a good cause."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704664309709?alt=media",
            title: "Global Builders",
            description: "Global Builders is a volunteer organization dedicated to building homes and infrastructure in underserved regions. Join us in constructing a better world."
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704664309709?alt=media",
            title: "EmpowerU",
            description: "EmpowerU is all about empowering individuals through education and mentorship. Volunteer with us to help others unlock their full potential."
        }
    ];



   
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                overflow: 'auto',
                width: '100%',
                scrollSnapType: 'x mandatory',
                '& > *': {
                    scrollSnapAlign: 'center',
                },
                '::-webkit-scrollbar': { display: 'none' },
            }}
        >
            {data.map((item, index) => (
                <Card
                    orientation="horizontal"
                    size="sm"
                    key={item.title}
                    variant="outlined"
                    sx={{
                        flex: '0 0 33.33%',
                        minWidth: 'calc(100% / 3)',
                        height: '70%',
                        flexDirection: 'column',
                        textAlign: 'end',
                    }}
                >
                    <AspectRatio ratio="1" sx={{ maxWidth: '40%', maxHeight: '40%' }}>
                        <img
                            srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.src}?h=120&fit=crop&auto=format`}
                            alt={item.title}
                            style={{ maxWidth: '100%', maxHeight: '100%' }} // Set max width and max height
                        />
                    </AspectRatio>
                    <Box sx={{ whiteSpace: 'normal', mx: 1, flexGrow: 1 }}>
                        <Typography level="title-md">{item.title}</Typography>
                        <Typography level="body-sm">{item.description}</Typography>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};
export default ImageCarousel;
