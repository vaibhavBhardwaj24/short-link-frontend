import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLinkAnalytics } from "./api.js";
import LinkAnalytics from "./component/LinkAnalytics.jsx";

export default function Analytics() {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLinkAnalytics(id);
        setAnalytics(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Link Analytics</h1>
      <LinkAnalytics data={analytics.data} />
    </div>
  );
}
