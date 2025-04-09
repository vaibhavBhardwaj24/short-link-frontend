import { useEffect, useState } from "react";
import { getDashboardStats } from "./api.js";
import LinkList from "./linkList.jsx";
import DashboardStats from "./dashboardStats.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <DashboardStats stats={stats.data.totals} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Links</h2>
        <LinkList links={stats.data.recentLinks} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Popular Links</h2>
        <LinkList links={stats.data.popularLinks} />
      </div>
    </div>
  );
}
