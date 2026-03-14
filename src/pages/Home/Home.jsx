import Banner from "./Banner";
import Contact from "./Contact";
import FeaturedDonors from "./FeaturedDonors";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | BloodConnect | Save Lives, Donate Blood</title>
            </Helmet>
            <Banner />
            <Stats />
            <HowItWorks />
            <FeaturedDonors />
            <Contact />
            
        </div>
    );
};

export default Home;