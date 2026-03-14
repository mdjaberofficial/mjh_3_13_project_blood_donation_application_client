import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiMapPin, FiHeart } from 'react-icons/fi';
import { FaDroplet } from 'react-icons/fa6';

const FeaturedDonors = () => {
    const { data: donors = [], isLoading } = useQuery({
        queryKey: ['featured-donors'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:3000/featured-donors');
            return data;
        }
    });

    if (isLoading) return null;

    return (
        <section className="py-24 bg-base-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div data-aos="fade-right">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-3">
                            <FiHeart className="animate-pulse" /> Our Lifesavers
                        </div>
                        <h2 className="text-4xl font-black text-neutral">Featured Donors</h2>
                        <p className="text-base-content/60 mt-2 max-w-md">
                            Meet some of the heroes in our community who are always ready to help.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {donors.map((donor, index) => (
                        <div 
                            key={donor._id} 
                            className="group bg-base-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-transparent hover:border-primary/20 text-center"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative inline-block mb-4">
                                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden mx-auto shadow-inner">
                                    <img src={donor.avatar} alt={donor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-error text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-4 border-base-100 shadow-lg">
                                    {donor.bloodGroup}
                                </div>
                            </div>

                            <h3 className="font-bold text-neutral truncate mb-1">{donor.name}</h3>
                            <div className="flex items-center justify-center gap-1 text-xs text-base-content/50 uppercase font-semibold">
                                <FiMapPin className="text-primary" /> {donor.district}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDonors;