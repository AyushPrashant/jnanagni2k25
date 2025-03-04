import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12 } from '../images/poster';


// {
//   id: string,
//   name: string,
//   alias: string,
//   image: string,
//   aboutEvent: string,
//   eventDetail: string[],}
const newEvents = [
  {
    id: "techQuiz",
    name: "Tech Quiz",
    alias: "Quiz Competition",
    image: image1,
    aboutEvent: "Participating in a quiz competition spanning diverse themes like Vedas, Vedic science and mathematics, technology, and current affairs offers a unique opportunity to explore the depths of human knowledge across epochs and disciplines. It's not just a test of memory; it's a voyage through the corridors of ancient wisdom, the frontiers of modern innovation, and the pulse of today's world. Engaging in such a competition isn't solely about showcasing expertise; it's an immersive experience that enriches one's understanding of the interconnectedness between historical wisdom, scientific advancements, and the ever-evolving currents of global affairs. It's a chance to celebrate the richness of our intellectual heritage while embracing the dynamic tapestry of contemporary knowledge, fostering a holistic perspective crucial for navigating the complexities of our multifaceted world.",
    eventDetail: ["This Event will only have one round"],
    rulebook: null,
    coordinator: ["Nitin Barak (8198910861)"]
  },
  {
    id: "dance",
    name: "Step Sensation",
    alias: "Dance Competition",
    image: image4,
    aboutEvent: "Dance is an art form often classified as a sport, consisting of sequences of body movements with aesthetic and often symbolic value, either improvised or purposefully selected. Dance can be categorized and described by its choreography, by its repertoire of movements or by its historical period or place of origin",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Samrendra Yadav (8853372226)", "Archit Padha (8082471978)"]
  },
  {
    id: "poetry",
    name: "Poetry",
    alias: "Poetry Competition",
    image: image5,
    aboutEvent: "Welcome to the Poetry Competition, a celebration of creativity, imagination, and the power of words! This competition invites poets of all ages and skill levels to share their unique voices and perspectives through the art of poetry.\nWhether you're an experienced poet or just starting out, we encourage you to express your thoughts, emotions, and experiences through your verse. We are looking for poems that inspire, challenge, and connect with others on a deep, personal level.",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Priyanshu Pandey"]
  },
  {
    id: "hackathon",
    name: "Coding Hackathon",
    alias: "Hackathon",
    image: image6,
    aboutEvent: "Embark on a transformative journey into the realms of cutting-edge technology and innovation with our upcoming development workshop - Technosis! This dynamic event is designed to be a beacon for tech enthusiasts, developers, and industry pioneers eager to explore the ever-evolving landscape of digital advancements.!",
    eventDetail: ["The event is a 6hrs hackathon which will have 1 round"],
    rulebook: null,
    coordinator: ["Ujjwal Kumar (9313114714)", "Aryan Vishala (9690107160)"]
  },
  {
    id: "startup",
    name: "Startup Adda",
    alias: "Startup Adda",
    image: image9,
    aboutEvent: "Get ready to ignite the tech world with your innovation! As you prepare to unveil your tech-based idea alongside its tangible prototype, envision the thrill of showcasing your brainchild to the world. This is your moment to dazzle with the sheer brilliance of your concept, bridging imagination and reality. Your presentation isn`t just about a product; it`s about the transformative power of ideas, and your prototype is the living testament to your vision. Embrace the excitement, as you`re about to set the stage ablaze with innovation and inspire the world with your tech marvel!",
    eventDetail: ["This event will have only one round"],
    rulebook: null,
    coordinator: ["Digvijaysinh Gohel (8849626755)", "Abhishek Singh (9758542651)", "Abhinav Singh (8057617624)"]
  },
  {
    id: "openmic",
    name: "Open Mic",
    alias: "Open Mic",
    image: image3,
    aboutEvent: "Open mic events are wonderful opportunities for creative expression! You have the freedom to share whatever inspires you—whether it's poetry or storytelling. It's your time to shine and showcase your unique creativity to an appreciative audience. Feel free to let your imagination run wild and share something that truly represents you. A standup comedian is a person who is a entertainer whose job is to make people laugh, by telling jokes or funny stories",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Archit Padha (8082471978)", "Harshdeep (8882655766)"]
  },

  {
    id: "drone",
    name: "Drone Rush",
    alias: "Drone Competition",
    image: image10,
    aboutEvent: "Welcome to Drone Rush, It is a Drone Competition providing an opportunity to showcase your skills and win exciting prices.\nBuild next level drones and showcase your engineering and innovation skills. ",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Abhinav Patel (6386502634)"]
  },
  {
    id: "robowar",
    name: "RoboWar",
    alias: "Robot War",
    image: image7,
    aboutEvent: "Gear up for the ultimate showdown in the world of robotics, the most anticipated robo war contest, is set to unleash a battlefield of technological supremacy! This groundbreaking event will bring together engineering marvels from across the globe, each designed to push the boundaries of innovation and redefine the future of robotic warfare.!",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Aryan Saini", "Aman Soni", "Yogesh Gupta", "Yash Patel"]
  },
  {
    id: "roborace",
    name: "RoboRace",
    alias: "Robot Race",
    image: image8,
    aboutEvent: "Gear up for the ultimate clash of metal and circuits at the highly anticipated Robo Rush, where cutting-edge technology meets adrenaline-pumping competition. This robo race contest is not just about speed; it`s a battle of innovation, engineering prowess, and the sheer thrill of witnessing robots zooming towards victory..!",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Aryan Saini", "Aman Soni", "Yogesh Gupta", "Yash Patel"]
  },
  {
    id: "valorant",
    name: "Valorant Night",
    alias: "E-Sports",
    image: image12,
    aboutEvent: "Embrace the chaos of Haven, master the corridors of Split! Our Valorant tournament awaits, where wielding a Vandal or Phantom might just label you as the Breeze Marksman. Dear gamers, Get ready to dive into the heart-pounding world of Valorant. This event promises an electrifying experience where you'll have the chance to demonstrate your skills, tactics, and teamwork in an intense gaming atmosphere. This is your opportunity to join fellow enthusiasts in a thrilling competitive arena.",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Supriya"]
  },
  {
    id: "singing",
    name: "Swar Sangam",
    alias: "Singing Competition",
    image: image2,
    aboutEvent: "Singing is the language of the heart, where each note tells a story, and every melody paints emotions on the canvas of our souls.",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Vishal Singh Saini"]
  },

  {
    id: "webdev",
    name: "Web Development",
    alias: "Web development",
    image: image11,
    aboutEvent: "Welcome to the Web Dev Competition, where innovation meets creativity in the world of web development! This competition challenges developers, designers, and tech enthusiasts to push the boundaries of what's possible on the web, showcasing your skills in creating stunning, functional, and user-friendly websites. Whether you're an experienced web developer or an aspiring coder, we encourage you to bring your best ideas to life. From front-end design to back-end functionality, this competition gives you the opportunity to demonstrate your expertise and contribute to the ever-evolving world of web development.",
    eventDetail: ["This event will have two round and the result will be announced on the last day"],
    rulebook: null,
    coordinator: ["Rohit Kumar (7348309041)", 'Anand Raj (9693887066)', 'Bhola Kumar (9693887066)']
  },

]


interface EventType {
  id: string;
  name: string;
  alias: string;
  image: StaticImageData;
  aboutEvent: string;
  eventDetail: string[];
  rulebook: string;
  coordinator: string[];
  // schedule: {
  //     day: string;
  //     venue: string;
  //     time: string;
  // };
  // Add other properties or adjust as needed
}

const Events = ({ headerShown }: { headerShown: any }) => {
  const router = useRouter();
  let showNav = router.query.showNav;
  const [isShowNav, setIsShowNav] = useState(showNav === 'true');
  const [events, setEvents] = useState<EventType[]>([]);

  const showAllEvents = router.query.allEvents === 'true';

  useEffect(() => {
    const handlePopstate = () => {
      setIsShowNav(false);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  useEffect(() => {
    const getEventsFromFirestore = async () => {
      try {
        const eventsCollection = await getDocs(query(collection(db, 'events')));
        const eventsData: EventType[] = newEvents.map((doc) => {
          const data = doc;
          return {
            id: data.id, // Add the document ID to the event data
            name: data.name || 'Default Name',
            alias: data.alias || 'Default Alias',
            image: data.image,
            aboutEvent: data.aboutEvent || 'Default About Event',
            eventDetail: data.eventDetail || ['Default Event Detail'],
            coordinator: data.coordinator,
            rulebook: data.rulebook || 'Default Rulebook URL',
            // schedule: {
            //   day: data.schedule?.day || 'Default Day',
            //   venue: data.schedule?.venue || 'Default Venue',
            //   time: data.schedule?.time || 'Default Time',
            // },
          };
        });
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    };

    getEventsFromFirestore();
  }, []);

  useEffect(() => {
    const showNavQueryParam = router.query.showNav === 'true';
    setIsShowNav(showNavQueryParam);
  }, [router.query.showNav]);

  const shouldShowNavMenu = headerShown && isShowNav;
  const eventToShow = showAllEvents ? events : events.slice(0, 6);

  return (
    <>
      {isShowNav && <NavMenu />}
      <div className='bg-[#151515] pb-10'>
        <div className='md:px-12 xl:px-6'>
          <div className='relative pt-36'>
            <div className='lg:w-2/3 text-center mx-auto'>
              <h1 className='text-white font-bold text-4xl md:text-6xl xl:text-7xl'>
                Events<span className='text-primary text-green-700'>.</span>
              </h1>
            </div>
          </div>
          <div className='mx-auto px-2 py-2 lg:px-10 lg:pt-12'>
            <div className='container justify-center lg:max-w-[1300px]'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {eventToShow.map((event) => (
                  <Link key={event.id} href={{ pathname: `/event/${event.id}` }}>
                    <div className='bg-slate-100 p-3 rounded-3xl m-4 cursor-pointer'>
                      <div>
                        <Image
                          className='h-auto max-w-full rounded-xl'
                          src={event.image}
                          alt=''
                          layout='responsive'
                          width={535}
                          height={720}
                          fetchPriority="high"
                        />
                      </div>
                      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 pt-3 text-center '>
                        {event.name}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {!showAllEvents && (
            <Link href={{ pathname: '/events', query: { allEvents: true, showNav: true } }} className='lg:w-2/3 md:text-center mx-auto flex justify-center'>
              <button
                type='button'
                className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                More Events
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;
export { newEvents };