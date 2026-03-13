import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Banner = () => {
    return (
        <div className="w-full h-[80vh]">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="w-full h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="w-full h-full relative bg-secondary text-white flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                        <div className="relative z-20 text-center px-4 max-w-3xl" data-aos="fade-up">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">Give the Gift of Life</h1>
                            <p className="text-lg md:text-xl mb-8 opacity-90">Every drop counts. Join our community of lifesavers today and make a difference in someone's world.</p>
                            <div className="flex justify-center gap-4">
                                <Link to="/register" className="btn btn-primary text-white border-none rounded-full px-8 text-lg">Join as Donor</Link>
                                <Link to="/search" className="btn btn-outline text-white hover:bg-white hover:text-neutral rounded-full px-8 text-lg border-white">Search Blood</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="w-full h-full relative bg-neutral text-white flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/20 z-10"></div>
                        <div className="relative z-20 text-center px-4 max-w-3xl">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">Need Blood Urgently?</h1>
                            <p className="text-lg md:text-xl mb-8 opacity-90">Find matching donors in your area quickly and easily. Our platform connects you with those ready to help.</p>
                            <Link to="/donation-requests" className="btn btn-primary text-white border-none rounded-full px-8 text-lg">View Requests</Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;