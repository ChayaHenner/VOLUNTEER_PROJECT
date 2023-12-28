import React, { useState ,useContext } from 'react'
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { storage, db } from '../firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AppContext } from '../../context/context';

export const uploadImageToStorage = async (selectedImage) => {
    try {
        if (selectedImage) {
            const timestamp = new Date().getTime();
            const fileName = `image_${timestamp}`;
            const storageRef = ref(storage, fileName);

            await uploadBytes(storageRef, selectedImage);
            const imageUrl = await getDownloadURL(storageRef);

            console.log('Image uploaded:', imageUrl);
            return imageUrl;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};
