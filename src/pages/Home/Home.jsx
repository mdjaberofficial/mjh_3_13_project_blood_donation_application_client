import Banner from "./Banner";
import Stats from "./Stats";

const Home = () => {
    return (
        <div>
            <Banner />
            <Stats />
            
            {/* Placeholders for upcoming sections */}
            <div className="py-20 bg-base-200">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-neutral mb-4" data-aos="fade-up">Featured Features</h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="100">
                        Explore how BloodConnect makes donating and requesting blood easier than ever.
                    </p>
                    {/* Feature Cards will go here */}
                </div>
            </div>

            <div className="py-20 bg-base-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-neutral mb-4" data-aos="fade-up">Contact Us</h2>
                    {/* Contact Form will go here */}
                </div>
            </div>
        </div>
    );
};

export default Home;