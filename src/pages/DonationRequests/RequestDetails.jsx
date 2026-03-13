import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { FiMapPin, FiCalendar, FiClock, FiUser, FiMail } from 'react-icons/fi';
import { FaHospital, FaDroplet } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RequestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: request, isLoading, refetch } = useQuery({
        queryKey: ['request-details', id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/donation-requests/${id}`);
            return data;
        }
    });

    const handleConfirmDonation = async () => {
        try {
            const donationInfo = {
                donorName: user?.displayName,
                donorEmail: user?.email
            };
            
            const res = await axiosSecure.patch(`/donation-requests/accept/${id}`, donationInfo);
            
            if (res.data.modifiedCount > 0) {
                toast.success("Thank you! You have accepted this request.");
                document.getElementById('donation_modal').close();
                refetch();
                navigate('/donation-requests');
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-2xl overflow-hidden" data-aos="fade-up">
                {/* Top Banner */}
                <div className="bg-error p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                            <FaDroplet className="text-5xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Blood Needed: {request.bloodGroup}</h1>
                            <p className="opacity-90">Requested by: {request.requesterName}</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <span className="badge badge-outline text-white border-white px-4 py-3">{request.status.toUpperCase()}</span>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Patient Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold border-b pb-2 text-neutral">Recipient Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-lg">
                                    <FiUser className="text-error" /> <span className="font-semibold">{request.recipientName}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FaHospital className="text-error" /> <span>{request.hospitalName}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiMapPin className="text-error" /> <span>{request.fullAddress}, {request.recipientUpazila}, {request.recipientDistrict}</span>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold border-b pb-2 text-neutral">Schedule</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-lg">
                                    <FiCalendar className="text-error" /> <span>{request.donationDate}</span>
                                </div>
                                <div className="flex items-center gap-4 text-lg">
                                    <FiClock className="text-error" /> <span>{request.donationTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 p-6 bg-base-200 rounded-2xl italic text-base-content/70 border-l-4 border-error">
                        "{request.requestMessage}"
                    </div>

                    {/* Conditional Action Button */}
                    <div className="mt-12 text-center">
                        {user ? (
                            <button 
                                onClick={() => document.getElementById('donation_modal').showModal()}
                                className="btn btn-error text-white btn-wide rounded-full text-lg shadow-xl shadow-error/20"
                                disabled={request.status !== 'pending'}
                            >
                                {request.status === 'pending' ? "Donate Now" : "Request Already In Progress"}
                            </button>
                        ) : (
                            <div className="alert alert-warning rounded-2xl shadow-md">
                                <span>Please <button onClick={() => navigate('/login')} className="font-bold underline">Login</button> to accept this donation request.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Donation Confirmation Modal */}
            <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl">
                    <h3 className="font-bold text-2xl text-center mb-6">Confirm Your Donation</h3>
                    <div className="space-y-4 bg-base-200 p-6 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <FiUser className="text-primary" /> <p className="font-medium">{user?.displayName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiMail className="text-primary" /> <p className="font-medium">{user?.email}</p>
                        </div>
                    </div>
                    <p className="py-4 text-center text-base-content/70">
                        By clicking confirm, you agree to donate blood for <b>{request?.recipientName}</b> at <b>{request?.hospitalName}</b>.
                    </p>
                    <div className="modal-action flex justify-center gap-4">
                        <button onClick={handleConfirmDonation} className="btn btn-error text-white px-10 rounded-full">Confirm</button>
                        <form method="dialog">
                            <button className="btn btn-ghost rounded-full">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RequestDetails;