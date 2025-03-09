import React from 'react'
import { profile, romit, rahul, archit, vivek, sourabh, sudhanshu, bikash, ashwani, ujjwal, supriya, ayush, gaurav,
    abhishek, aman, anand, bhola, mohit, rc, rk, subhanshu, soumik, sagar, saikat,
    denison
 } from '../images/team'
import Image, { StaticImageData } from 'next/image'
import { twitter, linkedin, github } from '../images/icons';
import NavMenu from '@/components/NavMenu';
import { useRouter } from 'next/router';
import { useState } from 'react';

const coreTeam = [
    {
        name: 'Mohit Kr. Sandilya',
        image: mohit,
        year: "ECE, 3rd Year",
    },
    {
        name: 'Rahul Kr. Prasad',
        image: rahul,
        year: "ME, 3rd Year",
    },
    {
        name: 'Archit Padha',
        image: archit,
        year: "EE, 3rd Year",
    },
    {
        name: 'Abhishek Kr.',
        image: abhishek,
        year: "ME, 3rd Year",
    },
]

const eventTeam = [
    {
        name: 'Vivek Patel',
        image: vivek,
        year: "ECE, 3rd Year",
    },
    {
        name: 'Romit Malik',
        image: romit,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Shubhanshu',
        image: subhanshu,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Rohit Kumar',
        image: rk,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Anand kumar',
        image: anand,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Supriya S. Ranjan',
        image: supriya,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Saikat Majumder',
        image: saikat,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Sagar Majumder',
        image: sagar,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Tinku Meena',
        image: profile,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Sudhanshu',
        image: sudhanshu,
        year: "EE, 3rd Year",
    },
    {
        name: 'Bikash Kr. Pandit',
        image: bikash,
        year: "EE, 3rd Year",
    },
    {
        name: 'Rohit Choudhary',
        image: rc,
        year: "ECE, 3rd Year",
    },
    {
        name: 'Sourabh Dehariya',
        image: sourabh,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Ashwani Kr. Gautam ',
        image: ashwani,
        year: "CSE, 1st Year",
    },
    {
        name: 'Aman Soni',
        image: aman,
        year: "ME, 1st Year",
    },
    {
        name: 'Bhola Kr.',
        image: bhola,
        year: "CSE, 3rd Year",
    },
    {
        name: 'Soumik R. Das',
        image: soumik,
        year: "CSE, 3rd Year",
    },


]

const promoTeam = [
    {
        name: 'Ujjwal Kr. Mishra',
        image: ujjwal,
        year: "ME, 3rd Year",
    },
    {
        name: 'Navin Joshi',
        image: profile,
        year: "ME, 3rd Year",
    },
    {
        name: 'Denison Shinglai',
        image: denison,
        year: "CSE, 3rd Year",
    },
]

const webTeam = [
    {
        name: 'Gaurav Jaiswar',
        image: gaurav,
        year: "CSE, 4th Year",
    },
    {
        name: 'Ayush Prashant',
        image: ayush,
        year: "CSE, 2nd Year",
    },
]

const Ourteam = () => {
    // let selectedTeam = [{
    //     name:"",
    //     image: profile,
    //     year: ""
    // }];
    const router = useRouter();
    const showNav = router.query.showNav;
    const [selectedType, setSelectedType] = useState<'core' | 'event' | "promo" | 'web'>('core');
    const [selectedTeam, setSelectedTeam] = useState<{ name: string, image: StaticImageData, year: string }[]>(coreTeam);

    const handleSelect = (type: 'core' | 'event' | "promo" | 'web') => {
        if (type === 'core') {
            setSelectedTeam(coreTeam);
        }
        if (type === 'event') {
            setSelectedTeam(eventTeam);
        }
        if (type === 'promo') {
            setSelectedTeam(promoTeam);
        }
        if (type === 'web') {
            setSelectedTeam(webTeam);
        }
        setSelectedType(type);
    };
    return (
        <>
            {showNav && (
                <NavMenu />
            )}
            <div className="flex justify-center">
                <div className="   md:px-12 xl:px-6">          <div className="relative pt-26 ">
                    <div className="lg:w-2/3 text-center  mx-auto">
                        <h1 className="text-white font-bold text-4xl md:text-6xl xl:text-7xl">OUR <span className="text-primary text-[#EACD69]">TEAM.</span></h1>

                    </div>
                </div>
                    <div className="flex justify-center mt-8 space-x-4 gap-6">
                        <button className={`px-6 py-2 text-white rounded-md ${selectedType === 'core' ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' : ' bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800'}`}
                            onClick={() => handleSelect('core')}>
                            Core Lead
                        </button>
                        <button className={`px-6 py-2 text-white rounded-md ${selectedType === 'event' ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' : ' bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800'}`}
                            onClick={() => handleSelect('event')}>
                            Events Lead
                        </button>
                        <button className={`px-6 py-2 text-white rounded-md ${selectedType === 'promo' ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' : ' bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800'}`}
                            onClick={() => handleSelect('promo')}>
                            Promotional Lead
                        </button>
                        <button className={`px-6 py-2 text-white rounded-md ${selectedType === 'web' ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' : ' bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800'}`}
                            onClick={() => handleSelect('web')}>
                            Web Lead
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 m-10  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-10">
                        {selectedTeam.map((item) => (
                            <div className="w-[300px] px-6 py-6  text-center bg-slate-200 rounded-lg lg:mt-0 xl:px-10">
                                <div className="space-y-4 xl:space-y-6 ">
                                    <Image className="mx-auto rounded-full h-36 w-36" src={item.image} alt="author avatar" />
                                    <div className="space-y-2">
                                        <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                                            <h1 className="text-black font-bold">{item.name}</h1>
                                            <p className='text-black'>{item.year}</p>
                                            {/* <div className="flex justify-center mt-5 space-x-5">
                                                <a href={item.twitter} target="_blank" rel="noopener noreferrer" className="inline-block text-white">
                                                    <span className="sr-only">Twitter</span>
                                                    <Image src={twitter} alt="twitter" />
                                                </a>
                                                <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400">
                                                    <span className="sr-only">GitHub</span>
                                                    <Image src={github} alt="github" />
                                                </a>
                                                <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <Image src={linkedin} alt="linkedin" width="20" />
                                                </a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>


    )
}

export default Ourteam