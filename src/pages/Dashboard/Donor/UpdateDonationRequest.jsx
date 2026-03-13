import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiSave, FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiPlusCircle } from 'react-icons/fi';
import { FaHospital, FaDroplet } from 'react-icons/fa6';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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

const UpdateDonationRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const { data: request, isLoading } = useQuery({
        queryKey: ['donation-request', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donation-requests/${id}`);
            return data;
        }
    });

    const selectedDistrict = watch("recipientDistrict");

    useEffect(() => {
        if (request) {
            reset(request);
        }
    }, [request, reset]);

    useEffect(() => {
        if (selectedDistrict && bdLocations[selectedDistrict]) {
            setFilteredUpazilas(bdLocations[selectedDistrict].sort());
        }
    }, [selectedDistrict]);

    const onSubmit = async (data) => {
        try {
            await axiosSecure.patch(`/donation-requests/update/${id}`, data);
            toast.success("Request updated successfully!");
            navigate('/dashboard/my-donation-requests');
        } catch (error) {
            toast.error("Failed to update request.");
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden" data-aos="fade-up">
                {/* Header Section */}
                <div className="bg-primary p-6 md:p-10 text-white flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 border-none">
                            <FiArrowLeft size={24} className="text-white" />
                        </button>
                        <div>
                            <h2 className="text-3xl font-bold">Edit Request</h2>
                            <p className="opacity-80 text-sm">Update donation details for {request?.recipientName}</p>
                        </div>
                    </div>
                    <FaDroplet className="text-5xl opacity-20 hidden md:block" />
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Recipient Name */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Recipient Name</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FiPlusCircle className="text-primary" />
                                <input type="text" {...register("recipientName", { required: true })} className="grow" placeholder="Enter patient name" />
                            </label>
                        </div>

                        {/* Blood Group */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Blood Group</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FaDroplet className="text-error" />
                                <select {...register("bloodGroup", { required: true })} className="grow bg-transparent outline-none">
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </label>
                        </div>

                        {/* District */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Recipient District</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FiMapPin className="text-primary" />
                                <select {...register("recipientDistrict", { required: true })} className="grow bg-transparent outline-none">
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </label>
                        </div>

                        {/* Upazila */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Recipient Upazila</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FiMapPin className="text-primary" />
                                <select {...register("recipientUpazila", { required: true })} className="grow bg-transparent outline-none">
                                    {filteredUpazilas.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </label>
                        </div>

                        {/* Hospital Name */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Hospital Name</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FaHospital className="text-primary" />
                                <input type="text" {...register("hospitalName", { required: true })} className="grow" placeholder="e.g. Dhaka Medical" />
                            </label>
                        </div>

                        {/* Full Address */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Full Address</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FiMapPin className="text-primary" />
                                <input type="text" {...register("fullAddress", { required: true })} className="grow" placeholder="Street, Floor, Ward" />
                            </label>
                        </div>

                        {/* Donation Date */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Donation Date</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FiCalendar className="text-primary" />
                                <input type="date" {...register("donationDate", { required: true })} className="grow" />
                            </label>
                        </div>

                        {/* Donation Time */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral">Donation Time</label>
                            <label className="input input-bordered flex items-center gap-3">
                                <FiClock className="text-primary" />
                                <input type="time" {...register("donationTime", { required: true })} className="grow" />
                            </label>
                        </div>
                    </div>

                    {/* Message Box */}
                    <div className="form-control w-full">
                        <label className="label font-bold text-neutral mr-5">Request Message</label>
                        <textarea 
                            {...register("requestMessage", { required: true })} 
                            className="textarea textarea-bordered h-32 text-base" 
                            placeholder="Briefly describe the urgency or specific requirements..."
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button type="submit" className="btn btn-primary flex-1 text-white rounded-xl shadow-lg hover:shadow-primary/30 transition-all">
                            <FiSave className="text-xl" /> Save Changes
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost border-base-300 rounded-xl px-10">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDonationRequest;