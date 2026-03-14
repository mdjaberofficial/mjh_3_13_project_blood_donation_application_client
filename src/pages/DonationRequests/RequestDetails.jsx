import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // 👈 Import your secure hook
import { FiMapPin, FiCalendar, FiClock, FiUser, FiActivity } from "react-icons/fi";
import { FaDroplet } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const RequestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); // 👈 Initialize
    const navigate = useNavigate();

    const { data: request, isLoading, refetch } = useQuery({
        queryKey: ['donation-request', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://mjh-3-13-project-blood-donation-app.vercel.app/donation-requests/${id}`);
            return data;
        }
    });

    const handleDonate = () => {
        if (!user) {
            toast.error("Please login to donate!");
            return navigate("/login");
        }
        document.getElementById('donation_modal').showModal();
    };

    // --- 🚀 NEW CONFIRM LOGIC 🚀 ---
    const handleConfirm = async () => {
        try {
            const donorInfo = {
                donorName: user?.displayName,
                donorEmail: user?.email
            };

            const res = await axiosSecure.patch(`/donation-requests/accept/${id}`, donorInfo);
            
            if (res.data.modifiedCount > 0) {
                toast.success("Thank you! You are now the donor for this request.");
                document.getElementById('donation_modal').close(); // Close modal
                refetch(); // Update UI to show 'In Progress'
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-error"></span></div>;

    // Optional chaining to prevent crashes
    const bloodGroup = request?.bloodGroup || "N/A";

    return (
        <div className="bg-base-200 min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-300">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-error to-red-700 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h2 className="text-4xl font-black mb-2">Donation Request</h2>
                            <p className="opacity-80 font-medium italic">"Your blood can give someone another chance at life."</p>
                        </div>
                        <div className="bg-white text-error w-24 h-24 rounded-3xl flex flex-col items-center justify-center shadow-lg">
                            <FaDroplet size={30} />
                            <span className="text-2xl font-black">{bloodGroup}</span>
                        </div>
                    </div>

                    {/* Content Section (Simplified for space) */}
                    <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-neutral border-b pb-2 flex items-center gap-2"><FiUser className="text-error" /> Patient: {request?.recipientName}</h3>
                            <p className="text-sm opacity-60 font-medium">{request?.hospitalName} - {request?.recipientDistrict}</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-neutral border-b pb-2 flex items-center gap-2"><FiActivity className="text-error" /> Status: {request?.status}</h3>
                            <p className="text-sm opacity-60 font-medium italic">"{request?.requestMessage}"</p>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="p-8 md:p-12 bg-base-50 border-t border-base-200 text-center">
                        <button 
                            onClick={handleDonate}
                            className={`btn btn-lg w-full md:w-auto px-12 text-white rounded-2xl shadow-xl border-none ${request?.status === 'pending' ? 'btn-error shadow-error/20' : 'btn-disabled'}`}
                            disabled={request?.status !== 'pending'}
                        >
                            {request?.status === 'pending' ? 'Donate Now' : 'Request Taken'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-[2.5rem] p-10">
                    <h3 className="font-black text-2xl">Confirm Your Donation</h3>
                    <div className="py-4 space-y-2 text-base-content/70">
                        <p><strong>Your Name:</strong> {user?.displayName}</p>
                        <p><strong>Your Email:</strong> {user?.email}</p>
                        <hr className="my-2" />
                        <p>By clicking confirm, you agree to contact the requester and arrive at the hospital on time.</p>
                    </div>
                    {/* Modal Action Area */}
                    <div className="modal-action">
                        <div className="flex gap-4 w-full">
                            {/* Cancel Button: Uses the dialog close method */}
                            <button 
                                type="button"
                                onClick={() => document.getElementById('donation_modal').close()} 
                                className="btn flex-1 rounded-2xl border-none bg-base-300"
                            >
                                Cancel
                            </button>

                            {/* Confirm Button: Calls your function to update the DB */}
                            <button 
                                type="button"
                                onClick={handleConfirm} 
                                className="btn btn-primary flex-1 text-white rounded-2xl shadow-lg shadow-primary/20 border-none"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RequestDetails;