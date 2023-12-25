import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // const imageUrl = await uploadImageToStorage(selectedImage);
    // data.userImage = imageUrl;
    console.log(data);
  }
  return (
    <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="row mt-3">
            <div className="col-4">
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        User Name:
                    </label>
                    <input {...register('userName', { required: true, minLength: 2 })} type="text" className="form-control" />
                    {errors.userName && <div className="text-danger">User Name is required and must be at least 2 characters long</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="userPhone" className="form-label">
                        Phone:
                    </label>
                    <input {...register('userPhone', { required: true, pattern: /^[0-9]{10}$/ })} type="tel" className="form-control" />
                    {errors.userPhone && <div className="text-danger">Phone is required and must be a valid 10-digit number</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">
                        Email:
                    </label>
                    <input {...register('userEmail', { required: true, pattern: /^\S+@\S+$/i })} type="email" className="form-control" />
                    {errors.userEmail && <div className="text-danger">Email is required and must be a valid email address</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="userImage" className="form-label">
                        Profile Image:
                    </label>
                    <input {...register('userImage')} type="file" accept="image/*" className="form-control" />
                    {/* onChange={(e) => setSelectedImage(e.target.files[0])}  */}
                </div>
            </div>

 

            <button type="submit" className="btn btn-success">
                Save
            </button>
        </form>
    </div>
);
};



export default SignUp