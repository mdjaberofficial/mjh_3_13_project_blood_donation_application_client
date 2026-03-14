import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FiMapPin, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaDroplet } from 'react-icons/fa6';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const DonationRequests = () => {
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['public-pending-requests'],
        queryFn: async () => {
            const { data } = await axios.get('https://mjh-3-13-project-blood-donation-app.vercel.app/public-donation-requests');
            return data;
        }
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <Helmet>
                <title>Donation Requests | BloodConnect</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12" data-aos="fade-down">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4">Pending Donation Requests</h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Every request represents a life in need. Browse the list below and help if you can.
                    </p>
                </div>

                {requests.length === 0 ? (
                    <div className="text-center bg-base-100 p-20 rounded-3xl shadow-xl">
                        <FaDroplet className="text-6xl text-base-content/10 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold">No Pending Requests Found</h2>
                        <p className="text-base-content/60 mt-2">Check back later or share the platform with others.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map((req) => (
                            <div key={req._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300" data-aos="zoom-in">
                                <div className="card-body">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-error/10 p-3 rounded-2xl">
                                            <FaDroplet className="text-3xl text-error" />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-base-content/50 uppercase tracking-widest">Blood Needed</span>
                                            <p className="text-3xl font-black text-error">{req.bloodGroup}</p>
                                        </div>
                                    </div>

                                    <h2 className="card-title text-2xl text-neutral mb-2">{req.recipientName}</h2>
                                    
                                    <div className="space-y-3 text-base-content/80 mt-2">
                                        <div className="flex items-center gap-3">
                                            <FiMapPin className="text-primary shrink-0" />
                                            <p>{req.recipientUpazila}, {req.recipientDistrict}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FiCalendar className="text-primary shrink-0" />
                                            <p>{req.donationDate}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FiClock className="text-primary shrink-0" />
                                            <p>{req.donationTime}</p>
                                        </div>
                                    </div>

                                    <div className="card-actions mt-6">
                                        <Link 
                                            to={`/donation-request-details/${req._id}`} 
                                            className="btn btn-primary btn-block text-white rounded-xl shadow-md"
                                        >
                                            View Details <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;