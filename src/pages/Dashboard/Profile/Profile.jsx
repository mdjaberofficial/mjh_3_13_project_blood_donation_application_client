import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

// Reusing the location map from Registration for the edit form
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

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, watch, reset } = useForm();
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const { data: dbUser = {}, isLoading, refetch } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data;
        }
    });

    const selectedDistrict = watch("district");

    useEffect(() => {
        if (selectedDistrict && bdLocations[selectedDistrict]) {
            setFilteredUpazilas(bdLocations[selectedDistrict].sort());
        } else {
            setFilteredUpazilas([]);
        }
    }, [selectedDistrict]);

    // Pre-fill form when entering edit mode
    useEffect(() => {
        if (isEditing && dbUser) {
            reset({
                name: dbUser.name,
                bloodGroup: dbUser.bloodGroup !== "Not Set" ? dbUser.bloodGroup : "",
                district: dbUser.district !== "Not Set" ? dbUser.district : "",
                upazila: dbUser.upazila !== "Not Set" ? dbUser.upazila : "",
            });
        }
    }, [isEditing, dbUser, reset]);

    const onSubmit = async (data) => {
        try {
            // Update MongoDB
            const updateInfo = {
                name: data.name,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                avatar: dbUser.avatar // Keeping existing avatar for now
            };

            await axiosSecure.patch(`/users/${user?.email}`, updateInfo);
            
            // Also update Firebase profile name just to keep them in sync
            if (data.name !== user.displayName) {
                await updateUserProfile(data.name, user.photoURL);
            }

            toast.success("Profile updated successfully!");
            setIsEditing(false);
            refetch(); // Refresh the data
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        }
    };

    if (isLoading) {
        return <div className="flex justify-center mt-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-xl overflow-hidden mt-8" data-aos="fade-up">
            <div className="bg-primary h-32 md:h-48 relative">
                {/* Cover Photo Area */}
                <div className="absolute -bottom-12 md:-bottom-16 left-8">
                    <div className="avatar">
                        <div className="w-24 md:w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-white">
                            <img src={dbUser?.avatar || user?.photoURL || "https://i.ibb.co/MxgVsK4/default-avatar.png"} alt="User Avatar" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 pt-16 md:pt-20">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral">{dbUser?.name}</h2>
                        <div className="flex gap-2 items-center mt-2">
                            <span className={`badge ${dbUser?.status === 'active' ? 'badge-success' : 'badge-error'} text-white`}>
                                {dbUser?.status}
                            </span>
                            <span className="badge badge-primary text-white capitalize">{dbUser?.role}</span>
                        </div>
                    </div>
                    
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-primary rounded-full">
                            <FiEdit2 /> Edit Profile
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(false)} className="btn btn-ghost text-error rounded-full">
                            <FiX /> Cancel
                        </button>
                    )}
                </div>

                <div className="divider"></div>

                {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-base-200 p-4 rounded-xl">
                            <p className="text-sm text-base-content/70 font-semibold mb-1">Email Address</p>
                            <p className="text-lg font-medium">{dbUser?.email}</p>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl">
                            <p className="text-sm text-base-content/70 font-semibold mb-1">Blood Group</p>
                            <p className="text-lg font-medium text-error">{dbUser?.bloodGroup}</p>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl">
                            <p className="text-sm text-base-content/70 font-semibold mb-1">District</p>
                            <p className="text-lg font-medium">{dbUser?.district}</p>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl">
                            <p className="text-sm text-base-content/70 font-semibold mb-1">Upazila</p>
                            <p className="text-lg font-medium">{dbUser?.upazila}</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Full Name</span></label>
                                <input type="text" className="input input-bordered w-full" {...register("name", { required: true })} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Email (Cannot be changed)</span></label>
                                <input type="email" className="input input-bordered w-full" value={dbUser?.email} disabled />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Blood Group</span></label>
                                <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full">
                                    <option value="" disabled>Select Blood Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">District</span></label>
                                <select {...register("district", { required: true })} className="select select-bordered w-full">
                                    <option value="" disabled>Select District</option>
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Upazila</span></label>
                                <select {...register("upazila", { required: true })} className="select select-bordered w-full" disabled={!selectedDistrict}>
                                    <option value="" disabled>Select Upazila</option>
                                    {filteredUpazilas.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button type="submit" className="btn btn-primary text-white rounded-full px-8">
                                <FiSave /> Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;