import React from 'react'

const WelcomeBanner = () => {
    return (
        <div className=" flex items-center justify-center hidden tablet:block">
            <div className="text-center p-8">
                <h2 className="text-2xl laptop:text-3xl font-bold">Welcome to Lalafell Custom Keyboard Store!</h2>
                <p className="mt-4 text-gray-800 text-sm laptop:text-base">
                    Discover the best custom keyboards to enhance your typing experience. Join us now and start building your perfect setup!
                </p>
                <div className="mt-8">
                    <img
                        src="../images/wellcom-banner.jpg"
                        alt="Banner"
                        className="mx-auto w-full object-cover object-center h-96 rounded-md"
                    />
                </div>
                <div className="">
                    <div className=" bg-primary-color/15 mt-8 p-4 rounded-md">
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