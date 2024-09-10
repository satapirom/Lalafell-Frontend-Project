
import { useState } from 'react'

const IconSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    const searchBoxClasses = `transition-all duration-300 ease-in-out overflow-hidden 
    ${isOpen ? 'w-32 tablet:w-64 opacity-100 ml-2' : 'max-w-0 opacity-0'}`;

    return (
        <div className="relative flex items-center">
            <img
                src="/images/icon-search.svg"
                alt="Search"
                onClick={() => setIsOpen(!isOpen)}
                className="h-6 w-6 tablet:h-7 tablet:w-7 laptop:h-8 laptop:w-8 cursor-pointer"
            />
            <div className={searchBoxClasses}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 px-4  text-sm font-light rounded-full outline-none transition-all duration-300 bg-[#EAEAEA]/60 w-full"
                />
            </div>
        </div>
    );
}

export default IconSearch;