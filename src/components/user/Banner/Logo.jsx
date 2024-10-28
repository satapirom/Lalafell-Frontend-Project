import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/">
            <div className="relative w-11 mr-2 tablet:w-28 h-10 rounded-md bg-primary-color overflow-hidden cursor-pointer transition-all duration-300 ease-in-out">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl mx-2">
                    <span className="animate-bounce hidden tablet:inline">L</span>
                    <span className="animate-pulse hidden tablet:inline">a</span>
                    <span className="animate-bounce tablet:hidden">L</span>
                    <span className="animate-bounce tablet:hidden">a</span>
                    <span className="animate-bounce tablet:hidden">f</span>
                    <span className="animate-bounce hidden tablet:inline">l</span>
                    <span className="animate-bounce hidden tablet:inline">a</span>
                    <span className="animate-bounce hidden tablet:inline">f</span>
                    <span className="animate-bounce hidden tablet:inline">e</span>
                    <span className="animate-bounce hidden tablet:inline">l</span>
                    <span className="animate-bounce hidden tablet:inline">l</span>
                </div>
            </div>
        </Link>
    );
};

export default Logo;


