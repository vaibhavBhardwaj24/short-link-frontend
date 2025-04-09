import { Link } from "react-router-dom";
import { ClockIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function LinkList({ links, type = "recent" }) {
  if (!links || links.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-500">No {type} links found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Short Link
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Destination
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link._id || link.linkId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-md">
                      {type === "recent" ? (
                        <ClockIcon className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChartBarIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        <a
                          href={`/analytics/${link._id || link.linkId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {link._id || link.linkId}
                        </a>
                      </div>
                      {link.alias && (
                        <div className="text-sm text-gray-500">
                          /{link.alias}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    <a
                      href={link.originalURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                      title={link.originalURL}
                    >
                      {link.originalURL}
                    </a>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      link.expDate && new Date(link.expDate) < new Date()
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {link.expDate && new Date(link.expDate) < new Date()
                      ? "Expired"
                      : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/analytics/${link._id || link.linkId}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Analytics
                  </Link>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://short-link-backend-three.vercel.app/link/${link._id}`
                      )
                    }
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
