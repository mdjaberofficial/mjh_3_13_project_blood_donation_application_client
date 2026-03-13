import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            toast.success('Successfully logged in!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to log in. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex bg-base-100">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-primary text-white flex-col justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
                <div className="relative z-10 text-center" data-aos="fade-right" data-aos-duration="1000">
                    <FaHeartbeat className="text-8xl mb-6 mx-auto animate-pulse" />
                    <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
                    <p className="text-lg opacity-90 max-w-md mx-auto">
                        Your continued support saves lives. Log in to manage your donation requests and connect with the community.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-base-200 lg:bg-base-100">
                <div className="w-full max-w-md" data-aos="fade-up" data-aos-duration="1000">
                    <div className="text-center mb-10 lg:hidden">
                        <FaHeartbeat className="text-6xl text-primary mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold text-neutral">BloodConnect</h2>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-neutral mb-2 hidden lg:block">Sign In</h2>
                    <p className="text-base-content/70 mb-8 hidden lg:block">Enter your details to access your dashboard.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full bg-base-100 focus-within:border-primary transition-colors">
                                <FiMail className="text-base-content/50" />
                                <input 
                                    type="email" 
                                    className="grow" 
                                    placeholder="Email Address"
                                    {...register("email", { required: "Email is required" })} 
                                />
                            </label>
                            {errors.email && <span className="text-error text-sm mt-2 ml-1">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full bg-base-100 focus-within:border-primary transition-colors">
                                <FiLock className="text-base-content/50" />
                                <input 
                                    type="password" 
                                    className="grow" 
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required" })} 
                                />
                            </label>
                            {errors.password && <span className="text-error text-sm mt-2 ml-1">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full text-white text-lg rounded-full shadow-lg hover:shadow-primary/50 transition-all">
                            Log In
                        </button>
                        
                        <p className="text-center text-neutral mt-6">
                            New to BloodConnect? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;