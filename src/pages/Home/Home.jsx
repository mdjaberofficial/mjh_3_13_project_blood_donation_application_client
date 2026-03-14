import Banner from "./Banner";
import Contact from "./Contact";
import FeaturedDonors from "./FeaturedDonors";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";

const Home = () => {
    return (
        <div>
            <Banner />
            <Stats />
            <HowItWorks />
            <FeaturedDonors />
            <Contact />
            
        </div>
    );
};

export default Home;