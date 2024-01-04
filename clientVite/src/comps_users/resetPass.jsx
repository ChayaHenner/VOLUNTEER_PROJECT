import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/context';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordForm = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const { user, setUser } = useContext(AppContext);
    const { token } = useParams();

    const nav = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            let newUser = { ...user };
            newUser.password = newPassword;
            setUser(newUser);
            nav(`/resetPass/${token}`);
        } else {
            setPasswordsMatch(false);
        }
    };

    return (
        <div className=' flex justify-center items-center'>
            <div className="bg-white p-6 rounded-lg">
                <div className="text-center text-2xl font-bold mb-4">Reset Password</div>
                <form onSubmit={onSubmit} className="mt-3 text-center">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-full"
                        />
                    </label>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-full"
                        />
                    </label>
                    {!passwordsMatch && (
                        <div className="text-red-500 text-xs mb-2">Passwords do not match. Please try again.</div>
                    )}
                    <div className="flex justify-center">
                        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
