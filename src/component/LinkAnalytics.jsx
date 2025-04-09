import { Doughnut, Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

export default function LinkAnalytics({ data }) {
  const deviceData = {
    labels: data.devices.map((d) => d.type),
    datasets: [
      {
        data: data.devices.map((d) => d.count),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const browserData = {
    labels: data.browsers.map((b) => `${b.name} ${b.version}`),
    datasets: [
      {
        data: data.browsers.map((b) => b.count),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#EC4899",
          "#14B8A6",
          "#F97316",
          "#8B5CF6",
          "#64748B",
        ],
      },
    ],
  };

  const countryData = {
    labels: data.countries.map((c) => c.name),
    datasets: [
      {
        data: data.countries.map((c) => c.count),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  const osData = {
    labels: data.operatingSystems.map((os) => `${os.name} ${os.version}`),
    datasets: [
      {
        data: data.operatingSystems.map((os) => os.count),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  const hourlyData = {
    labels: data.hourlyTraffic.map((h) => h.hour),
    datasets: [
      {
        label: "Clicks by Hour",
        data: data.hourlyTraffic.map((h) => h.count),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const timelineData = {
    labels: data.timeline.map((t) => t.date),
    datasets: [
      {
        label: "Daily Clicks",
        data: data.timeline.map((t) => t.count),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const referrerData = {
    labels:
      data.referrers.length > 0 ? data.referrers.map((r) => r.url) : ["Direct"],
    datasets: [
      {
        data:
          data.referrers.length > 0
            ? data.referrers.map((r) => r.count)
            : [data.clicks.total],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Link Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Original URL:</p>
            <a
              href={data.link.originalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              {data.link.originalURL}
            </a>
          </div>
          <div>
            <p className="text-gray-600">Short URL:</p>
            <a
              href={data.link.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              {data.link.shortUrl}
            </a>
          </div>
          <div>
            <p className="text-gray-600">Created:</p>
            <p>{new Date(data.link.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                data.link.expiresAt &&
                new Date(data.link.expiresAt) < new Date()
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {data.link.expiresAt && new Date(data.link.expiresAt) < new Date()
                ? "Expired"
                : "Active"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold">{data.clicks.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">Unique Visitors</h3>
          <p className="text-3xl font-bold">{data.clicks.unique}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold">{data.clicks.conversionRate}%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Devices</h3>
          <div className="h-64">
            <Doughnut
              data={deviceData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Browsers</h3>
          <div className="h-64">
            <Pie
              data={browserData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Countries</h3>
          <div className="h-64">
            <Doughnut
              data={countryData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Operating Systems</h3>
          <div className="h-64">
            <Pie
              data={osData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Hourly Traffic</h3>
          <div className="h-64">
            <Line
              data={hourlyData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Daily Traffic</h3>
          <div className="h-64">
            <Bar
              data={timelineData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {data.referrers.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Traffic Sources</h3>
          <div className="h-64">
            <Doughnut
              data={referrerData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
