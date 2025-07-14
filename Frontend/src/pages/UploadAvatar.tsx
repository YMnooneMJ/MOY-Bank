import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const UploadAvatar: React.FC = () => {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection and generate preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // Handle avatar upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Please select a file to upload.");
    }

    const formData = new FormData();
    formData.append("avatar", file); // backend expects 'avatar' field

    setLoading(true);
    try {
      const res = await axios.post(
        "https://moy-bank-backend.onrender.com/api/users/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Avatar uploaded successfully!");
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Upload failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">🖼️ Upload Avatar</h2>

      <form onSubmit={handleUpload} className="space-y-5">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto object-cover border"
          />
        ) : (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No image selected.
          </p>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Avatar"}
        </button>
      </form>
    </div>
  );
};

export default UploadAvatar;
