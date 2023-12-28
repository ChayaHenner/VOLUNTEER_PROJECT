import React, { useState,useContext } from 'react';
import { AppContext } from '../../context/context';
import { useNavigate ,useParams} from 'react-router-dom';


const ResetPasswordForm = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const { user, setUser } = useContext(AppContext);
    const { token } = useParams();

    const nav = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault(); // מניע את ההתנהגות ברירת המחדל של הטופס
        let newUser = { ...user }; // יש ליצור עות'ב של user כדי לא לשנות את האובייקט המקורי
        newUser.password = newPassword;
        console.log(newUser);
        setUser(newUser);
        console.log(token);
        nav(`/resetPass/${token}`);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPasswordForm;
