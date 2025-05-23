import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../utils/baseRequest";
import Cookies from "js-cookie";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    otp_verification: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!form.email) return alert("Masukkan email terlebih dahulu");
    setOtpLoading(true);
    try {
      await request.post("/auth/send-otp", { email: form.email });
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await request.post("/auth/register", {
        ...form,
        otp_verification: parseInt(form.otp_verification),
      });

      const { access_token, refresh_token } = res.data.data;
      Cookies.set("accessToken", access_token, { secure: true, sameSite: "strict" });
      Cookies.set("refreshToken", refresh_token, { secure: true, sameSite: "strict" });

      navigate("/");
    } catch (err) {
      setError("Gagal mendaftar. Periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#de8b27] mb-6">Daftar Akun ChevaStore</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
              required
            />
            <button
              type="button"
              onClick={sendOtp}
              disabled={otpLoading}
              className="px-4 py-2 bg-[#de8b27] text-white rounded hover:bg-[#c77b23] whitespace-nowrap"
            >
              {otpLoading ? "Mengirim..." : otpSent ? "Terkirim" : "Kirim OTP"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Kode OTP</label>
          <input
            type="number"
            name="otp_verification"
            value={form.otp_verification}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">No HP</label>
          <input
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Konfirmasi Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#de8b27] text-white py-2 rounded-lg hover:bg-[#c77b23]"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>
      </form>
    </main>
  );
}
