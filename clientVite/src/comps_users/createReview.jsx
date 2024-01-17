import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import StarReview from './starReview'
import { uploadImageToStorage } from '../helper/helper';
import { AppContext } from '../../context/context';


const CreateReview = ({ id, setShowCreatePost }) => {
    const [ratingValue, setRatingValue] = useState(3.5);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const [len, setLen] = useState(0);


    const onSubPost = async (data) => {
        console.log(data);

        const imageUrl = await uploadImageToStorage(selectedImage);
        data.img_url = imageUrl;
        data.rating = ratingValue
        console.log(data);

        let url = SERVER_URL + `/reviews/${id}`;//add is
        try {
            let resp = await apiRequest(url, "POST", data);
            console.log("review added");
            setShowCreatePost(false)

        } catch (err) {
            console.log("ERROR ", err);
        }

    };
  
    const handleDescriptionChange = (e) => {
        setLen(e.target.value.length);
        console.log("changed");
    };

    return (
        <form onSubmit={handleSubmit(onSubPost)} className="mt-3">

            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800  p-1  ">
                <input  {...register('title', { required: true })} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="true" placeholder="Title" type="text" />
                <textarea {...register('description', { required: true })} spellCheck="true" className="h-60 bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="true" placeholder="Describe experience with this souldier" onChange={handleDescriptionChange} ></textarea>

               
                <div className="count ml-auto text-gray-400 text-xs font-semibold">{len}/300</div>

                <div id="preview" className="my-4 flex">
                   
                </div>
                <div>
                    <StarReview setRatingValue={setRatingValue} ratingValue={ratingValue} />
                </div>
                <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Review</button>
                <button type="button" onClick={() => { setShowCreatePost(false) }} className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Close Review</button>
            </div >

        </form>
    )
}

export default CreateReview