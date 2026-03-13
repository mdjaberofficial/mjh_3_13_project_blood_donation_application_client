import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiMapPin, FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import { FaDroplet, FaHospital } from 'react-icons/fa6';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

// Reusing the location map for the dropdowns
const bdLocations = {
    "Dhaka": ["Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar"],
    "Chattogram": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchari", "Hathazari", "Mirsharai", "Patiya", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
    "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Sylhet Sadar", "Zakiganj"],
    "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore"],
    "Khulna": ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgacha", "Phultala", "Rupsha", "Terokhada"],
    "Barishal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
    "Rangpur": ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
    "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal"],
    "Cumilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Daudkandi", "Homna", "Laksam", "Muradnagar", "Nangalkot", "Titas"],
    "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
    "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
    "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"]
};
const districts = Object.keys(bdLocations).sort();

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const selectedDistrict = watch("recipientDistrict");

    useEffect(() => {
        if (selectedDistrict && bdLocations[selectedDistrict]) {
            setFilteredUpazilas(bdLocations[selectedDistrict].sort());
        } else {
            setFilteredUpazilas([]);
        }
    }, [selectedDistrict]);

    const onSubmit = async (data) => {
        try {
            const requestData = {
                requesterName: user?.displayName,
                requesterEmail: user?.email,
                recipientName: data.recipientName,
                recipientDistrict: data.recipientDistrict,
                recipientUpazila: data.recipientUpazila,
                hospitalName: data.hospitalName,
                fullAddress: data.fullAddress,
                bloodGroup: data.bloodGroup,
                donationDate: data.donationDate,
                donationTime: data.donationTime,
                requestMessage: data.requestMessage,
                status: 'pending'
            };

            await axiosSecure.post('/donation-requests', requestData);
            toast.success("Donation request created successfully!");
            reset();
            // We will redirect to 'My Donation Requests' once that page is built
            // navigate('/dashboard/my-donation-requests'); 
        } catch (error) {
            console.error(error);
            toast.error("Failed to create request.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-xl overflow-hidden mt-8" data-aos="fade-up">
            <div className="bg-primary p-8 text-white text-center">
                <FaDroplet className="text-5xl mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Create Donation Request</h2>
                <p className="mt-2 opacity-90">Fill out the form below to request blood for a patient in need.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                
                {/* Read-Only Requester Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-base-200 rounded-xl">
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Requester Name</span></label>
                        <label className="input input-bordered flex items-center gap-3 bg-base-300">
                            <FiUser className="text-base-content/50" />
                            <input type="text" className="w-full" value={user?.displayName || ''} readOnly />
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Requester Email</span></label>
                        <label className="input input-bordered flex items-center gap-3 bg-base-300">
                            <FiMail className="text-base-content/50" />
                            <input type="email" className="w-full" value={user?.email || ''} readOnly />
                        </label>
                    </div>
                </div>

                <div className="divider">Patient Details</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recipient Name */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Recipient Name</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="Patient's Full Name" {...register("recipientName", { required: true })} />
                    </div>

                    {/* Blood Group */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Required Blood Group</span></label>
                        <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full" defaultValue="">
                            <option value="" disabled>Select Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                    </div>

                    {/* District */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Recipient District</span></label>
                        <select {...register("recipientDistrict", { required: true })} className="select select-bordered w-full" defaultValue="">
                            <option value="" disabled>Select District</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Recipient Upazila</span></label>
                        <select {...register("recipientUpazila", { required: true })} className="select select-bordered w-full" defaultValue="" disabled={!selectedDistrict}>
                            <option value="" disabled>Select Upazila</option>
                            {filteredUpazilas.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    {/* Hospital Name */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Hospital Name</span></label>
                        <label className="input input-bordered flex items-center gap-3 w-full">
                            <FaHospital className="text-base-content/50" />
                            <input type="text" className="w-full" placeholder="e.g., Dhaka Medical College" {...register("hospitalName", { required: true })} />
                        </label>
                    </div>

                    {/* Full Address */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Full Address</span></label>
                        <label className="input input-bordered flex items-center gap-3 w-full">
                            <FiMapPin className="text-base-content/50" />
                            <input type="text" className="w-full" placeholder="Specific ward/room/address" {...register("fullAddress", { required: true })} />
                        </label>
                    </div>

                    {/* Donation Date */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Donation Date</span></label>
                        <label className="input input-bordered flex items-center gap-3 w-full">
                            <FiCalendar className="text-base-content/50" />
                            <input type="date" className="w-full" {...register("donationDate", { required: true })} />
                        </label>
                    </div>

                    {/* Donation Time */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Donation Time</span></label>
                        <label className="input input-bordered flex items-center gap-3 w-full">
                            <FiClock className="text-base-content/50" />
                            <input type="time" className="w-full" {...register("donationTime", { required: true })} />
                        </label>
                    </div>
                </div>

                {/* Request Message */}
                <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Explanation / Request Message</span></label>
                    <textarea 
                        className="textarea textarea-bordered h-24 w-full" 
                        placeholder="Why is blood needed? Provide any specific instructions here..." 
                        {...register("requestMessage", { required: true })}
                    ></textarea>
                </div>

                <div className="mt-8 flex justify-end">
                    <button type="submit" className="btn btn-primary text-white rounded-full px-10 text-lg shadow-lg">
                        <FiFileText className="mr-2" /> Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDonationRequest;