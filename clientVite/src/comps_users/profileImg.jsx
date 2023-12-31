import React from 'react';

const ProfileImg = ({ img_url }) => {
    console.log(img_url); // Log the img_url

    return (
        <div className="rounded-full overflow-hidden">
            <img src={img_url} alt="Profile" className="w-full h-full object-cover" />
        </div>
    );
};

export default ProfileImg;
