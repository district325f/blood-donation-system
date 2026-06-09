"use client";

import { useState } from "react";
import Link from "next/link";
import StatusPopup from "../components/StatusPopup";

export default function Register() {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    BloodGroup: "",
    District: "",
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "loading" as "loading" | "success" | "error" | "warning",
    message: "",
  });

  const API_URL =
    "https://script.google.com/macros/s/AKfycbyXSe4JQoCLY_SQ1Nw9ltY6ajLmoIRzLkwORup5bVdqD_eKvU2p_p5TF6wgyFoAjIeU0w/exec";

  const districts = [
    "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura",
    "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan",
    "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta",
    "Dhanusha", "Dolakha", "Dolpa", "Doti", "Eastern Rukum", "Gorkha",
    "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali",
    "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu",
    "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari",
    "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi",
    "Nawalpur", "Parasi", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar",
    "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat",
    "Rolpa", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari",
    "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu",
    "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Tehrathum",
    "Udayapur", "Western Rukum",
  ];

  const closePopup = () => setPopup({ ...popup, show: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneClean = formData.Phone.replace(/\D/g, "");

    if (phoneClean.length < 10) {
      setPopup({ show: true, type: "warning", message: "कृपया सही मोबाइल नम्बर राख्नुहोस्।" });
      return;
    }

    setLoading(true);
    setPopup({ show: true, type: "loading", message: "Donor विवरण जाँच हुँदैछ...\nकृपया पर्खनुहोस्।" });

    try {
      const checkUrl =
        `${API_URL}?action=checkDonor` +
        `&phone=${encodeURIComponent(formData.Phone)}` +
        `&name=${encodeURIComponent(formData.Name)}`;

      const checkRes = await fetch(checkUrl);
      const checkData = await checkRes.json();

      if (checkData.phoneExists) {
        setPopup({
          show: true,
          type: "warning",
          message: "यो विवरण पहिले नै सिस्टममा सुरक्षित छ।\nकृपया पुरानो विवरण जाँच गर्नुहोस् वा Blood Management Team संग सम्पर्क गर्नुहोस्।",
        });
        setLoading(false);
        return;
      }

      if (checkData.nameExists) {
        const confirmRegister = window.confirm(
          "यो नामसँग मिल्दोजुल्दो विवरण पहिले नै भेटियो।\nकृपया मोबाइल नम्बर र विवरण सही छ कि छैन जाँच गर्नुहोस्।\n\nके तपाईं यो विवरण नयाँ Donor को रूपमा दर्ता गर्न चाहनुहुन्छ?"
        );
        if (!confirmRegister) {
          setPopup({ show: true, type: "warning", message: "Donor Registration रोकियो।" });
          setLoading(false);
          return;
        }
      }

      setPopup({ show: true, type: "loading", message: "Donor विवरण सुरक्षित हुँदैछ...\nकृपया पर्खनुहोस्।" });

      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setPopup({ show: true, type: "success", message: "Donor विवरण सफलतापूर्वक सिस्टममा सुरक्षित भयो।" });
      setFormData({ Name: "", Phone: "", BloodGroup: "", District: "" });
    } catch (error) {
      setPopup({ show: true, type: "error", message: "सर्भरमा समस्या आयो।\nकृपया फेरि प्रयास गर्नुहोस्।" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <StatusPopup show={popup.show} type={popup.type} message={popup.message} onClose={closePopup} />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-100">
          <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">&larr; Back to Home</Link>
          <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Full Name" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} className="w-full p-3 border rounded-lg" />
            <input required type="tel" placeholder="Phone Number" value={formData.Phone} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} className="w-full p-3 border rounded-lg" />
            <select required value={formData.BloodGroup} onChange={(e) => setFormData({ ...formData, BloodGroup: e.target.value })} className="w-full p-3 border rounded-lg">
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            <select required value={formData.District} onChange={(e) => setFormData({ ...formData, District: e.target.value })} className="w-full p-3 border rounded-lg">
              <option value="">Select District</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-gray-400">
              {loading ? "Please wait..." : "Register Donor"}
            </button>
          </form>
        </div>
      </div>
      <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm">
        <p>Design By: <span className="font-bold text-red-600">Nirajan Aryal</span></p>
        <p>Contact: <span className="font-bold">9851113811</span></p>
      </footer>
    </div>
  );
}
