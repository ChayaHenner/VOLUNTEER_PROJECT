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
    // const { user, setUser } = useContext(AppContext);


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
    //     useEffect(() => {
    // setLen(0)   
    //  }, [showCreatePost]);
    const handleDescriptionChange = (e) => {
        setLen(e.target.value.length);
        console.log("changed");
    };

    return (
        <form onSubmit={handleSubmit(onSubPost)} className="mt-3">

            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800  p-1  ">
                <input  {...register('title', { required: true })} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="true" placeholder="Title" type="text" />
                <textarea {...register('description', { required: true })} spellCheck="true" className="h-60 bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="true" placeholder="Describe experience with this souldier" onChange={handleDescriptionChange} ></textarea>

                {/* <div className="icons flex text-gray-500 m-2">
                        <label id="select-image">
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <input {...register('img_url')} hidden type="file" multiple onChange={(e) => { setSelectedImage(e.target.files[0]) }} x-ref="fileInput" />

                        </label> */}
                <div className="count ml-auto text-gray-400 text-xs font-semibold">{len}/300</div>
                {/* </div> */}

                <div id="preview" className="my-4 flex">
                    {/* <template x-for="(image, index) in images" key="index">
                            <div className="relative w-32 h-32 object-cover rounded ">
                                <div x-show="image.preview" className="relative w-32 h-32 object-cover rounded">
                                    <img src="image.url" className="w-32 h-32 object-cover rounded" />
                                    <button className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                                    <div x-text="image.size" className="text-xs text-center p-2"></div>
                                </div>
                                <div x-show="!image.preview" className="relative w-32 h-32 object-cover rounded">

                                    <svg className="fill-current  w-32 h-32 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                    </svg>
                                    <button className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                                    <div x-text="image.size" className="text-xs text-center p-2"></div>
                                </div>

                            </div>
                        </template> */}
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