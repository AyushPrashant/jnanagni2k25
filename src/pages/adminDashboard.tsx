import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '@/context/authContext';

// Define the EventRegistration interface
interface EventRegistrationType {
    id: string;
    event_id: string;
    event_name: string;
    user_id: string;
    user_name: string;
    user_phone: string;
    user_email: string;
}

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const [isShowNav, setIsShowNav] = useState(true);
    const [eventRegistrations, setEventRegistrations] = useState<EventRegistrationType[]>([]);
    const { user } = useAuth(); // Destructure the user object

    useEffect(() => {
        const handlePopstate = () => {
            setIsShowNav(true);
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        const fetchEventRegistrations = async () => {
            try {
                if (user) {
                    const userEventRegistrations = await getDocs(
                        query(collection(db, 'event_registration'), where('user_id', '==', user.uid))
                    );

                    const eventRegistrationsData: EventRegistrationType[] = userEventRegistrations.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            event_id: data.event_id,
                            event_name: data.event_name,
                            user_id: data.user_id,
                            user_name: data.user_name,
                            user_phone: data.user_phone,
                            user_email: data.user_email,
                        };
                    });

                    setEventRegistrations(eventRegistrationsData);
                }
            } catch (error) {
                console.error('Error fetching event registrations:', error);
            }
        };

        fetchEventRegistrations();
    }, [user]);

    return (
        <div>
            {isShowNav && <NavMenu />}

            <div className='bg-[#151515] pb-10'>
                <div className='md:px-12 xl:px-6'>
                    {/* Your other components here */}

                    {/* Display the table */}
                    <div className='mx-auto px-2 py-2 lg:px-10 lg:pt-12'>
                        <div className='container justify-center lg:max-w-[1300px]'>
                            <table className='min-w-full'>
                                <thead>
                                    <tr>
                                        <th className='py-3 px-6 text-left'>Event Name</th>
                                        <th className='py-3 px-6 text-left'>Total Registrations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventRegistrations.map((registration) => (
                                        <tr key={registration.id}>
                                            <td className='py-3 px-6'>{registration.event_name}</td>
                                            {/* Fetch and display the total number of registrations for each event */}
                                            <td className='py-3 px-6'>
                                                {Object.entries(
                                                    eventRegistrations.reduce((accumulator, registration) => {
                                                        if (registration.event_id in accumulator) {
                                                            accumulator[registration.event_id]++;
                                                        } else {
                                                            accumulator[registration.event_id] = 1;
                                                        }
                                                        return accumulator;
                                                    }, {} as Record<string, number>)
                                                ).map(([eventId, count]) => (
                                                    <div key={eventId}>
                                                        {eventId}: {count}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
