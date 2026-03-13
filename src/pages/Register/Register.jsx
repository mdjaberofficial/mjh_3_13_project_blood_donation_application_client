import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiMapPin, FiDroplet } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const selectedDistrict = watch("district");

    useEffect(() => {
        fetch('/districts.json').then(res => res.json()).then(data => setDistricts(data));
        fetch('/upazilas.json').then(res => res.json()).then(data => setUpazilas(data));
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            const districtId = districts.find(d => d.name === selectedDistrict)?.id;
            const relatedUpazilas = upazilas.filter(u => u.district_id === districtId);
            setFilteredUpazilas(relatedUpazilas);
        }
    }, [selectedDistrict, districts, upazilas]);

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

                await axios.post('http://localhost:3000/users', userInfo);
                
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
            <div 
                className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
                data-aos="zoom-in" 
                data-aos-duration="800"
            >
                {/* Visual Banner for Register */}
                <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-center items-center relative">
                     <div className="absolute inset-0 bg-black/10"></div>
                     <div className="relative z-10 text-center">
                        <FiDroplet className="text-7xl mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold mb-2">Be a Hero</h2>
                        <p className="text-sm opacity-90">Join our network of donors and volunteers making a real impact every day.</p>
                     </div>
                </div>

                {/* Form Section */}
                <div className="md:w-2/3 p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-neutral mb-6 border-b pb-4">Create Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Name */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiUser className="text-base-content/50" />
                                <input type="text" className="grow" placeholder="Full Name" {...register("name", { required: true })} />
                            </label>
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiMail className="text-base-content/50" />
                                <input type="email" className="grow" placeholder="Email Address" {...register("email", { required: true })} />
                            </label>
                        </div>

                        {/* Avatar (Cleaned up for readability) */}
                        <div className="form-control w-full">
                            <input 
                                type="file" 
                                className="file-input file-input-bordered w-full" 
                                {...register("avatar", { required: true })} 
                            />
                        </div>

                        {/* Blood Group */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 p-0 pr-3 overflow-hidden w-full">
                                <div className="bg-base-300 h-full px-3 flex items-center justify-center border-r">
                                    <FiDroplet className="text-error" />
                                </div>
                                <select {...register("bloodGroup", { required: true })} className="select select-ghost w-full font-semibold" defaultValue="">
                                    <option value="" disabled>Blood Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {/* District */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 p-0 pr-3 overflow-hidden w-full">
                                <div className="bg-base-300 h-full px-3 flex items-center justify-center border-r">
                                    <FiMapPin className="text-base-content/60" />
                                </div>
                                <select {...register("district", { required: true })} className="select select-ghost w-full" defaultValue="">
                                    <option value="" disabled>Select District</option>
                                    {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                            </label>
                        </div>

                        {/* Upazila */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 p-0 pr-3 overflow-hidden w-full">
                                <div className="bg-base-300 h-full px-3 flex items-center justify-center border-r">
                                    <FiMapPin className="text-base-content/60" />
                                </div>
                                <select {...register("upazila", { required: true })} className="select select-ghost w-full" defaultValue="" disabled={!selectedDistrict}>
                                    <option value="" disabled>Select Upazila</option>
                                    {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                </select>
                            </label>
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiLock className="text-base-content/50" />
                                <input type="password" className="grow" placeholder="Password" {...register("password", { required: true, minLength: 6 })} />
                            </label>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full">
                                <FiLock className="text-base-content/50" />
                                <input type="password" className="grow" placeholder="Confirm Password" {...register("confirm_password", { required: true })} />
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="form-control md:col-span-2 mt-4 w-full">
                            <button type="submit" className="btn btn-primary w-full text-white text-lg rounded-full shadow-lg hover:shadow-primary/50 transition-all">
                                Complete Registration
                            </button>
                        </div>
                    </form>
                    
                    <p className="text-center text-neutral mt-6">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;