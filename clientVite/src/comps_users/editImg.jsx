import React, { useState, useEffect, useContext, useRef } from 'react'
import { uploadImageToStorage } from '../helper/helper';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Loading from '../comps_main/loading';
import { useAutoAlert } from '../comps_main/alertUtil'
const EditImg = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const { user, setUser } = useContext(AppContext);
    const nav = useNavigate()
    const [loading, setLoading] = useState(false); // Loading state
    const { showAlert, AutoAlert } = useAutoAlert();

    const onSubmit = async (data) => {
        setLoading(true)
        const imageUrl = await uploadImageToStorage(selectedImage);
        data.img_url = imageUrl;
        console.log(imageUrl);
        console.log(data);
        let url = SERVER_URL + "/users/image?url=" + imageUrl
        console.log(url);
        try {

            let resp = await apiRequestNoBody(url, "PUT")
            console.log("token", resp.data.token);
            Cookies.set('user', JSON.stringify(resp.data.user), { expires: 1 }); // expires in 1 day
            setUser(resp.data.user)
            showAlert("img saved successfully")
            // alert("img saved successfully")
            nav("/my-profile")
        }
        catch (err) {
            console.log("ERROR ", err);
            showAlert(err);
        }
        console.log(data);
        setLoading(false)
    }
    return (
        <div>
                  <AutoAlert />

            {
                loading ? (
                    <Loading text={"changing image..."} />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                        <div className="mb-4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Profile Image:
                            </label>
                            <input {...register('img_url')} type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                            {/* <input {...register('img_url')} type="file" accept="image/*" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" /> */}
                        </div>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                            Save
                        </button>
                    </form>

                )
            }
        </div>
    )
}

export default EditImg