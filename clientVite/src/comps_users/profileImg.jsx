import React from 'react';

const ProfileImg = ({ img_url }) => {

    return (
        <div className="w-12 h-12 rounded-full overflow-hidden border">
            <img src={img_url} alt="Profile" className="w-full h-full object-cover" />
        </div>
    );
};

export default ProfileImg;
