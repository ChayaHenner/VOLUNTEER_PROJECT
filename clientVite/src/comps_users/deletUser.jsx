import React,{useState} from 'react';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Loading from '../comps_main/loading';
import { SERVER_URL, apiRequestNoBody } from '../serverConnect/api';

const DeletUser = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false); // Loading state

    const handleDeletUser = async () => {
        console.log("delete");
        setLoading(true);
        let url = SERVER_URL + "/users/delete"
        try {

            let resp = await apiRequestNoBody(url, "PUT")
            Cookies.remove('token');
            Cookies.remove('user');
            alert("delete")
            nav("/")
        }
        catch (err) {
            console.log("ERROR ", err);
            alert(err);
        }
        setLoading(false)
    };

    return (
        <div>
            {
                loading ? (
                    <Loading text={"delete..."} />
                ) : (

                    <button className='bg-purple-500 text-white px-4 py-2 rounded-md mt-4' onClick={handleDeletUser}>Delet Profile</button>
                )
            }
        </div >

    );
};

export default DeletUser;
