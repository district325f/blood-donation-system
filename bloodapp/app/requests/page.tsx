"use client";

import { useState } from "react";
import Link from "next/link";
import StatusPopup from "../components/StatusPopup";

export default function Requests() {
  const [formData, setFormData] = useState({
    PatientName: "",
    Phone: "",
    BloodGroup: "",
    HospitalName: "",
    Units: "",
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "loading" as "loading" | "success" | "error" | "warning",
    message: "",
  });

  const API_URL =
    "https://script.google.com/macros/s/AKfycbyXSe4JQoCLY_SQ1Nw9ltY6ajLmoIRzLkwORup5bVdqD_eKvU2p_p5TF6wgyFoAjIeU0w/exec";

  const closePopup = () => setPopup({ ...popup, show: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ show: true, type: "loading", message: "Blood Request submit हुँदैछ...\nकृपया पर्खनुहोस्।" });

    const now = new Date();
    const dataToSend = {
      ...formData,
      Date: now.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Kathmandu",
      }),
      Time: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kathmandu",
      }),
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      setPopup({ show: true, type: "success", message: "Blood Request सफलतापूर्वक सिस्टममा सुरक्षित भयो।" });
      setFormData({ PatientName: "", Phone: "", BloodGroup: "", HospitalName: "", Units: "" });
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
          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Blood Request Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Patient Name" value={formData.PatientName} onChange={(e) => setFormData({ ...formData, PatientName: e.target.value })} className="w-full p-3 border rounded-lg" />
            <input required type="tel" placeholder="Contact Phone Number" value={formData.Phone} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} className="w-full p-3 border rounded-lg" />
            <select required value={formData.BloodGroup} onChange={(e) => setFormData({ ...formData, BloodGroup: e.target.value })} className="w-full p-3 border rounded-lg">
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            <input required type="text" placeholder="Hospital Name" value={formData.HospitalName} onChange={(e) => setFormData({ ...formData, HospitalName: e.target.value })} className="w-full p-3 border rounded-lg" />
            <input required type="number" placeholder="Units Needed" value={formData.Units} onChange={(e) => setFormData({ ...formData, Units: e.target.value })} className="w-full p-3 border rounded-lg" />
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400">
              {loading ? "Please wait..." : "Submit Request"}
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
