import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import TobaLake from '../img/lake_toba.jpg';
import muaratapanuli from '../img/Muara_Tapanuli.jpg';
import lumbinipark from '../img/taman-alam-lumbini.jpg';
import samosir from '../img/samosir.jpg';

const places = [
    { name: 'Danau Toba', image: TobaLake },
    { name: 'Muara Tapanuli Utara', image: muaratapanuli },
    { name: 'Taman Alam Lumbini', image: lumbinipark },
    { name: 'Pulau Samosir', image: samosir }
];

function Header() {
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
    const bgRef = useRef(null);
    const textRef = useRef(null);
    const discoverRef = useRef(null); 

    const nextPlace = useCallback(() => {
        setCurrentPlaceIndex((currentPlaceIndex + 1) % places.length);
        gsap.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
        gsap.fromTo(discoverRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    }, [currentPlaceIndex]);

    useEffect(() => {
        const timer = setTimeout(() => {
            gsap.to([bgRef.current, textRef.current, discoverRef.current], { opacity: 0, duration: 1, onComplete: nextPlace }); 
        }, 5000);
        return () => clearTimeout(timer); 
    }, [nextPlace]);

    const prevPlace = () => {
        setCurrentPlaceIndex((currentPlaceIndex - 1 + places.length) % places.length);
        gsap.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo(textRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
        gsap.fromTo(discoverRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }); 
    };

    return(
        <div className="relative min-h-[75vh]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 mt-10 z-50">
                <div className="flex items-center bg-white rounded-full p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input className="bg-transparent outline-none flex-grow text-black" type="text" placeholder="Where can we take you?"/>
                </div>
            </div>
            <div className="relative min-h-[75vh] flex flex-col justify-center items-start">
                <div ref={bgRef} className={`absolute inset-0 bg-cover bg-center`} style={{backgroundImage: `url(${places[currentPlaceIndex].image})`}} />
            <div className="p-4 absolute bottom-0 left-0 text-left">
                <h1 ref={discoverRef} className="text-2xl font-semibold text-white">Discover your next vacation</h1> 
                <div ref={textRef} className={`p-2 rounded-full inline-flex items-center relative scale-100 opacity-100`}>
                    <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                    <div className="relative z-10 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl overflow-hidden whitespace-nowrap text-overflow-ellipsis">{places[currentPlaceIndex].name}</span>
                    </div>
                </div>
            </div>
            <div className="p-4 flex justify-center items-center absolute inset-0 w-full">
                <button onClick={prevPlace} className="absolute left-0 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>
                </button>
                <button onClick={nextPlace} className="absolute right-0 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                </button>
            </div>
        </div>
        </div>
    );
}

export default Header;