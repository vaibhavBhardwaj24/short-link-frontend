import { useState } from "react";
import { createShortLink } from "./api.js";

export default function CreateLinkForm() {
  const [formData, setFormData] = useState({
    originalURL: "",
    alias: "",
    expDate: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createShortLink(formData);
      setResult(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create link");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="originalURL">
            Destination URL
          </label>
          <input
            type="url"
            id="originalURL"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.originalURL}
            onChange={(e) =>
              setFormData({ ...formData, originalURL: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="alias">
            Custom Alias (optional)
          </label>
          <input
            type="text"
            id="alias"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.alias}
            onChange={(e) =>
              setFormData({ ...formData, alias: e.target.value })
            }
            minLength="3"
            maxLength="20"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="expDate">
            Expiration Date (optional)
          </label>
          <input
            type="datetime-local"
            id="expDate"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.expDate}
            onChange={(e) =>
              setFormData({ ...formData, expDate: e.target.value })
            }
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Short Link
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="font-medium text-green-800">Short Link Created!</h3>
          <div className="mt-2">
            <p className="text-sm">Short URL:</p>
            <a
              href={result.data.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              {result.data.shortUrl}
            </a>
          </div>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `https://short-link-backend-three.vercel.app/link/${result.data._id}`
              )
            }
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
