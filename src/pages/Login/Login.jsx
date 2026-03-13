import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaHeartbeat, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, signInWithGoogle } = useAuth();
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

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            
            // Save user to DB if they don't exist
            const userInfo = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                bloodGroup: "Not Set",
                district: "Not Set",
                upazila: "Not Set",
                role: 'donor',
                status: 'active'
            };
            await axios.post('http://localhost:3000/users', userInfo);

            toast.success('Logged in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error("Google sign-in failed.");
        }
    };

    return (
        <div className="min-h-screen flex bg-base-100">
            {/* Left Side - Branding */}
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

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full bg-base-100 focus-within:border-primary transition-colors">
                                <FiMail className="text-base-content/50 shrink-0" />
                                <input type="email" className="w-full" placeholder="Email Address" {...register("email", { required: "Email is required" })} />
                            </label>
                            {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 w-full bg-base-100 focus-within:border-primary transition-colors">
                                <FiLock className="text-base-content/50 shrink-0" />
                                <input type="password" className="w-full" placeholder="Password" {...register("password", { required: "Password is required" })} />
                            </label>
                            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full text-white text-lg rounded-full shadow-lg hover:shadow-primary/50 transition-all">
                            Log In
                        </button>
                    </form>

                    <div className="divider text-base-content/50 my-6">OR</div>
                    
                    <button onClick={handleGoogleSignIn} className="btn btn-outline bg-amber-100 w-full rounded-full flex items-center gap-2 hover:bg-amber-200 hover:text-neutral border-base-300">
                        <FaGoogle className="text-lg text-error" /> Continue with Google
                    </button>
                    
                    <p className="text-center text-neutral mt-8">
                        New to BloodConnect? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;