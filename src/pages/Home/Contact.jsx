import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent! We'll get back to you soon.");
        e.target.reset();
    };

    return (
        <section className="py-24 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="bg-neutral rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                    
                    {/* Left Side: Contact Info */}
                    <div className="lg:w-2/5 bg-primary p-10 md:p-16 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-black mb-6" data-aos="fade-right">Get in Touch</h2>
                            <p className="text-white/80 mb-10" data-aos="fade-right" data-aos-delay="100">
                                Have questions about donation or need technical support? Our team is here to help you 24/7.
                            </p>
                            
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" data-aos="fade-right" data-aos-delay="200">
                                    <div className="bg-white/20 p-4 rounded-2xl"><FiMail size={24} /></div>
                                    <div>
                                        <p className="text-sm opacity-70">Email us at</p>
                                        <p className="font-bold text-lg">support@bloodconnect.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5" data-aos="fade-right" data-aos-delay="300">
                                    <div className="bg-white/20 p-4 rounded-2xl"><FiPhone size={24} /></div>
                                    <div>
                                        <p className="text-sm opacity-70">Call us</p>
                                        <p className="font-bold text-lg">+880 1234 567890</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5" data-aos="fade-right" data-aos-delay="400">
                                    <div className="bg-white/20 p-4 rounded-2xl"><FiMapPin size={24} /></div>
                                    <div>
                                        <p className="text-sm opacity-70">Office</p>
                                        <p className="font-bold text-lg">Sylhet, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:w-3/5 p-10 md:p-16 bg-base-100">
                        <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-left">
                            {/* Row 1: Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-neutral">Your Name</span>
                                    </label>
                                    <input type="text" placeholder="John Doe" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary h-12" required />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-neutral">Email Address</span>
                                    </label>
                                    <input type="email" placeholder="john@example.com" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary h-12" required />
                                </div>
                            </div>

                            {/* Row 2: Subject */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-neutral">Subject</span>
                                </label>
                                <input type="text" placeholder="How can we help?" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary h-12" required />
                            </div>

                            {/* Row 3: Message */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-neutral">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary h-32 leading-relaxed" placeholder="Tell us more..." required></textarea>
                            </div>

                            {/* Row 4: Submit */}
                            <button className="btn btn-primary w-full text-white rounded-2xl h-14 shadow-xl shadow-primary/20 border-none text-lg mt-4">
                                <FiSend className="mr-2" /> Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;