import React from 'react';

const SwichesCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg relative mx-auto my-4 flex flex-col w-full h-40 laptop:h-52 overflow-hidden">
            <div className="relative">
                <img
                    src="../images/Switch.jpg"
                    alt="Switch"
                    className="w-full h-40 laptop:h-52 object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 hover:bg-[#E9E4D6]/40 bg-[#E9E4D6]/70 px-2 bg-gradient-to-t from-purple-800/30 via-transparent to-transparent">
                    <h3 className="font-bold text-xl labtop:text-2xl mb-2 text-center">Switches</h3>
                    <p className="text-sm labtop:text-lg italic mb-4 text-center">"Feel the difference in every press."</p>
                    <div className="flex items-center">
                        <span className="text-yellow-500 text-sm tablet:text-base mr-1">★</span>
                        <span className="text-xs labtop:text-base">Rating</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SwichesCard;
