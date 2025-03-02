import Image from 'next/image';
import logo from '../images/logo.png'
import logo_compressed from '../images/logo_compressed.png'
import logoText from '../images/logo_text.png';

const Header = () => {
    return (
        <>
            <header>
                <div className="relative inset-x-0 overflow-hidden">

                    <video autoPlay muted={false} loop
                        className='absolute inset-0 w-full h-full object-cover'
                        style={{ position: 'fixed', width: '100%', height: '100vh', objectFit: 'cover', zIndex: -1, opacity: .3 }}>
                        <source src="/background_video.mp4" type="video/mp4" />
                    </video>
                </div>
               
            </header>


        </>
    );
};

export default Header;
