// Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold mb-2">Meet the Team</p>
                <div className="flex justify-center space-x-4">
                    <div>
                        <p className="text-sm">Tamar Shvartz</p>
                        <p className="text-xs">Phone: 058-3205471</p>
                    </div>
                    <div>
                        <p className="text-sm">Chaya Henner</p>
                        <p className="text-xs">Phone: 052-7695444</p>
                    </div>
                    <div>
                        <p className="text-sm">Bat Sheva Shachar</p>
                        <p className="text-xs">Phone: 055-6796515</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
