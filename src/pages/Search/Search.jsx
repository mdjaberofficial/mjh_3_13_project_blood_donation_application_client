import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiSearch, FiMapPin, FiUsers } from 'react-icons/fi';
import { FaDroplet } from 'react-icons/fa6';
import axios from 'axios';

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

const Search = () => {
    const [filter, setFilter] = useState({ bloodGroup: '', district: '', upazila: '' });
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const { data: donors = [], isLoading, refetch } = useQuery({
        queryKey: ['search-donors', filter],
        queryFn: async () => {
            const { data } = await axios.get(`https://mjh-3-13-project-blood-donation-app.vercel.app/donor-search`, { params: filter });
            return data;
        },
        enabled: false // Only fetch when user clicks search
    });

    useEffect(() => {
        if (filter.district) {
            setFilteredUpazilas(bdLocations[filter.district].sort());
        }
    }, [filter.district]);

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10" data-aos="fade-down">
                    <h1 className="text-4xl font-black text-neutral mb-2">Find a <span className="text-primary">Donor</span></h1>
                    <p className="text-base-content/60">Search for blood donors by location and blood group</p>
                </div>

                {/* Filter Bar */}
                <div className="bg-base-100 p-6 rounded-3xl shadow-xl mb-12 border border-base-300" data-aos="fade-up">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase">Blood Group</label>
                            <select 
                                className="select select-bordered w-full bg-base-200 border-none focus:ring-2 ring-primary"
                                onChange={(e) => setFilter({...filter, bloodGroup: e.target.value})}
                            >
                                <option value="">Any Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase">District</label>
                            <select 
                                className="select select-bordered w-full bg-base-200 border-none focus:ring-2 ring-primary"
                                onChange={(e) => setFilter({...filter, district: e.target.value})}
                            >
                                <option value="">Any District</option>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase">Upazila</label>
                            <select 
                                className="select select-bordered w-full bg-base-200 border-none focus:ring-2 ring-primary"
                                onChange={(e) => setFilter({...filter, upazila: e.target.value})}
                                disabled={!filter.district}
                            >
                                <option value="">Any Upazila</option>
                                {filteredUpazilas.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary text-white rounded-xl shadow-lg shadow-primary/20">
                            <FiSearch /> Search Donors
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {isLoading ? (
                    <div className="text-center py-20"><span className="loading loading-dots loading-lg text-primary"></span></div>
                ) : donors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donors.map(donor => (
                            <div key={donor._id} className="card bg-base-100 shadow-md border border-base-200 hover:-translate-y-1 transition-all">
                                <div className="card-body items-center text-center">
                                    <div className="avatar mb-2">
                                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={donor.avatar} alt={donor.name} />
                                        </div>
                                    </div>
                                    <h2 className="card-title text-neutral">{donor.name}</h2>
                                    <div className="flex gap-2 mb-2">
                                        <div className="badge badge-error text-white p-3 font-bold">{donor.bloodGroup}</div>
                                        <div className="badge badge-outline text-xs uppercase tracking-tighter">Verified Donor</div>
                                    </div>
                                    <div className="text-base-content/70 text-sm flex items-center gap-2">
                                        <FiMapPin className="text-primary" /> {donor.upazila}, {donor.district}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
                        <FiUsers className="text-6xl text-base-content/10 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">No donors found matching these criteria</h3>
                        <p className="text-base-content/50">Try broadening your search or checking a different location.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;