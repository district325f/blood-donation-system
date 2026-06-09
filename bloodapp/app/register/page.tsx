"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
    const [formData, setFormData] = useState({
        Name: '',
        Phone: '',
        BloodGroup: '',
        District: ''
    });
    const [loading, setLoading] = useState(false);

    const districts = [
        "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur",
        "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusha", "Dolakha",
        "Dolpa", "Doti", "Eastern Rukum", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali",
        "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung",
        "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalparai (East of Bardaghat Susta)/Nawalpur",
        "Nawalparasi (West of Bardaghat Susta)/Parasi", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parbat", "Parsa",
        "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi",
        "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung",
        "Tehrathum", "Udayapur", "Western Rukum"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const API_URL = "https://script.google.com/macros/s/AKfycbyXSe4JQoCLY_SQ1Nw9ltY6ajLmoIRzLkwORup5bVdqD_eKvU2p_p5TF6wgyFoAjIeU0w/exec" + "?sheet=Donors";

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [formData] }),
            });

            if (res.ok) {
                alert("सफलतापूर्वक डोनर दर्ता भयो!");
                setFormData({ Name: '', Phone: '', BloodGroup: '', District: '' });
            } else {
                alert("डेटा पठाउन समस्या भयो।");
            }
        } catch (error) {
            alert("सर्भरमा समस्या आयो।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-100">
                    <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">&larr; Back to Home</Link>
                    <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Registration</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input required type="text" placeholder="Full Name" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} className="w-full p-3 border rounded-lg" />
                        <input required type="tel" placeholder="Phone Number" value={formData.Phone} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} className="w-full p-3 border rounded-lg" />

                        <select required value={formData.BloodGroup} onChange={(e) => setFormData({ ...formData, BloodGroup: e.target.value })} className="w-full p-3 border rounded-lg">
                            <option value="">Select Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>

                        <select required value={formData.District} onChange={(e) => setFormData({ ...formData, District: e.target.value })} className="w-full p-3 border rounded-lg">
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>

                        <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition">
                            {loading ? "Registering..." : "Register Donor"}
                        </button>
                    </form>
                </div>
            </div>

            {/* फूटर थपिएको */}
            <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm">
                <p>Design By: <span className="font-bold text-red-600">Nirajan Aryal</span></p>
                <p>Contact: <span className="font-bold">9851113811</span></p>
            </footer>
        </div>
    );
}
