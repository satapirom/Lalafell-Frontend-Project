import React from 'react'

const WelcomeBanner = () => {
    return (
        <div className="bg-[#E9E4D6]/40 bg-gradient-to-b from-purple-800/40 via-transparent to-transparent text-white p-8 flex items-center justify-center hidden tablet:block">
            <div className="text-center">
                <h2 className="text-2xl laptop:text-3xl font-bold">Welcome to Lalafell Custom Keyboard Store!</h2>
                <p className="mt-4 text-gray-800 text-sm laptop:text-base">
                    Discover the best custom keyboards to enhance your typing experience. Join us now and start building your perfect setup!
                </p>
                <div className="mt-8 laptop:mt-16">
                    <img
                        src="../images/wellcom-banner.png"
                        alt="Banner"
                        className="mx-auto w-60 laptop:w-80"
                    />
                </div>
                <div className="">
                    <div className=" bg-white p-4 rounded-md">
                        <h3 className="text-lg font-semibold text-gray-800">Join the Lalafell keyboard Community!</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Become a part of our vibrant community of keyboard enthusiasts and stay updated on the latest trends and special offers!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeBanner;