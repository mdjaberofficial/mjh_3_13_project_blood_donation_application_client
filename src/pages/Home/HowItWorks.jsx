import { FiUserPlus, FiSearch, FiMessageCircle, FiHeart } from "react-icons/fi";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
const HowItWorks = () => {
    const { user } = useAuth();

    const steps = [
        {
            id: 1,
            title: "Register",
            description: "Create an account in minutes. Join as a donor or a requester to get started.",
            icon: <FiUserPlus />,
            color: "bg-blue-500",
        },
        {
            id: 2,
            title: "Search or Request",
            description: "Find donors by blood group and location, or post a request for immediate help.",
            icon: <FiSearch />,
            color: "bg-purple-500",
        },
        {
            id: 3,
            title: "Connect",
            description: "Donors accept requests, and you'll get instant notifications to coordinate the donation.",
            icon: <FiMessageCircle />,
            color: "bg-pink-500",
        },
        {
            id: 4,
            title: "Save a Life",
            description: "Complete the donation at the hospital and help someone in a critical situation.",
            icon: <FiHeart />,
            color: "bg-error",
        }
    ];

    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-neutral mb-4" data-aos="fade-up">How It Works</h2>
                    <p className="text-base-content/60 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Our platform simplifies the process of blood donation, making it fast and efficient for everyone involved.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {steps.map((step, index) => (
                        <div 
                            key={step.id} 
                            className="relative group text-center"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            {/* Step Number Badge */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-base-200 flex items-center justify-center font-bold text-neutral shadow-md z-10 group-hover:bg-primary group-hover:text-white transition-colors">
                                {step.id}
                            </div>

                            {/* Icon Container */}
                            <div className={`w-24 h-24 mx-auto rounded-3xl ${step.color} text-white flex items-center justify-center text-4xl shadow-2xl mb-6 transform group-hover:rotate-6 transition-transform`}>
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-3 text-neutral">{step.title}</h3>
                            <p className="text-base-content/70 leading-relaxed text-sm">
                                {step.description}
                            </p>

                            {/* Arrow for Desktop (except last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-[70%] w-full h-px border-t-2 border-dashed border-base-300 -z-0"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
            <div className="container mx-auto px-6">
                {/* ... title and steps grid ... */}

                {/* Bottom CTA - Only visible if NO user is logged in */}
                {!user && (
                    <div className="mt-20 px-4" data-aos="zoom-in">
                        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-2 bg-base-200 rounded-3xl md:rounded-full shadow-inner border border-base-300">
                            <p className="px-6 py-2 text-center md:text-left font-bold text-neutral text-lg">
                                Ready to make an impact?
                            </p>
                            <button 
                                className="btn btn-primary text-white rounded-2xl md:rounded-full px-10 h-14 md:h-12 w-full md:w-auto shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all border-none text-lg"
                                onClick={() => Navigate('/register')}
                            >
                                Get Started Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </section>
    );
};

export default HowItWorks;