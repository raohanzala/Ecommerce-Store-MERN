import { Link } from 'react-router-dom';
// import { MdOutlineArrowRightAlt } from 'react-icons/md';
// import { HiArrowLongRight } from 'react-icons/hi2';

function HeadingLink({ heading, link }) {
    return (
        <div className='w-full flex justify-between items-start mb-5 px-2'>
            <h2 className='text-lg'>{heading}</h2>

            <Link
                to={`${link}`}
                className='text-lg text-[#6a6a6a] hover:underline flex items-center group'
            >
                view all 
                <span className="ml-1 opacity-0 text-xl group-hover:opacity-100 transition-opacity duration-300">
                {/* <HiArrowLongRight /> */}
                </span>
            </Link>
        </div>
    );
}

export default HeadingLink;
