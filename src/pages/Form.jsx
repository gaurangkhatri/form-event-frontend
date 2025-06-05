import { useState } from 'react';
import axios from 'axios';

export default function Form() {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await axios.post(`${API_BASE_URL}/submit`, form);
      setStatus('✅ Submitted successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('❌ Submission failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Submit Your Info</h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded-lg"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full border p-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        {status && <p className="text-sm text-center text-gray-600">{status}</p>}
      </form>
    </div>
  );
}