import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FaDroplet } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// Comprehensive generated map of Bangladesh Districts to Upazilas
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
    "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
    // Add more districts here as needed!
};

const districts = Object.keys(bdLocations).sort();

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const selectedDistrict = watch("district");

    useEffect(() => {
        if (selectedDistrict && bdLocations[selectedDistrict]) {
            setFilteredUpazilas(bdLocations[selectedDistrict].sort());
        } else {
            setFilteredUpazilas([]);
        }
    }, [selectedDistrict]);

    const onSubmit = async (data) => {
        if (data.password !== data.confirm_password) {
            return toast.error("Passwords do not match!");
        }

        const imageFile = { image: data.avatar[0] };
        
        try {
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const avatarUrl = res.data.data.display_url;
                await createUser(data.email, data.password);
                await updateUserProfile(data.name, avatarUrl);

                const userInfo = {
                    name: data.name,
                    email: data.email,
                    avatar: avatarUrl,
                    bloodGroup: data.bloodGroup,
                    district: data.district,
                    upazila: data.upazila,
                    role: 'donor',
                    status: 'active'
                };

                await axios.post('https://mjh-3-13-project-blood-donation-app.vercel.app/users', userInfo);
                toast.success('Registration successful! Welcome to the community.');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred during registration");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 md:p-8">
            <Helmet>
                <title>Register | BloodConnect</title>
            </Helmet>
            <div className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row" data-aos="zoom-in" data-aos-duration="800">
                {/* Visual Banner */}
                <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-center items-center relative">
                     <div className="absolute inset-0 bg-black/10"></div>
                     <div className="relative z-10 text-center">
                        <FaDroplet className="text-7xl mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold mb-2">Be a Hero</h2>
                        <p className="text-sm opacity-90">Join our network of donors and volunteers making a real impact every day.</p>
                     </div>
                </div>

                {/* Form Section */}
                <div className="md:w-2/3 p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-neutral mb-6 border-b pb-4">Create Account</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiUser className="text-base-content/50 shrink-0" />
                                <input type="text" className="w-full" placeholder="Full Name" {...register("name", { required: true })} />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiMail className="text-base-content/50 shrink-0" />
                                <input type="email" className="w-full" placeholder="Email Address" {...register("email", { required: true })} />
                            </label>
                        </div>

                        {/* Clean File Input */}
                        <div className="form-control w-full">
                            <input type="file" className="file-input file-input-bordered w-full" {...register("avatar", { required: true })} />
                        </div>

                        {/* Clean Dropdowns */}
                        <div className="form-control w-full">
                            <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full" defaultValue="">
                                <option value="" disabled>Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <select {...register("district", { required: true })} className="select select-bordered w-full" defaultValue="">
                                <option value="" disabled>Select District</option>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <select {...register("upazila", { required: true })} className="select select-bordered w-full" defaultValue="" disabled={!selectedDistrict}>
                                <option value="" disabled>Select Upazila</option>
                                {filteredUpazilas.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiLock className="text-base-content/50 shrink-0" />
                                <input type="password" className="w-full" placeholder="Password" {...register("password", { required: true, minLength: 6 })} />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiLock className="text-base-content/50 shrink-0" />
                                <input type="password" className="w-full" placeholder="Confirm Password" {...register("confirm_password", { required: true })} />
                            </label>
                        </div>

                        <div className="form-control md:col-span-2 mt-4">
                            <button type="submit" className="btn btn-primary w-full text-white text-lg rounded-full shadow-lg hover:shadow-primary/50 transition-all">
                                Complete Registration
                            </button>
                        </div>
                    </form>

                    {/* <div className="divider text-base-content/50 mt-6 mb-4">OR</div>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline w-full rounded-full flex items-center gap-2 hover:bg-base-200 hover:text-neutral border-base-300">
                        <FaGoogle className="text-lg text-error" /> Sign up with Google
                    </button> */}
                    
                    <p className="text-center text-neutral mt-6">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;