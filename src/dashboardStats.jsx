// import {
//   ArrowUpIcon,
//   LinkIcon,
//   ChartBarIcon,
//   ClockIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";

// export default function DashboardStats({ stats }) {
//   const metrics = [
//     {
//       id: "totalLinks",
//       name: "Total Links",
//       value: stats?.links || 0,
//       icon: LinkIcon,
//       change: "+12%",
//       changeType: "positive",
//     },
//     {
//       id: "totalClicks",
//       name: "Total Clicks",
//       value: stats?.clicks || 0,
//       icon: ChartBarIcon,
//       change: "+24%",
//       changeType: "positive",
//     },
//     {
//       id: "clickThroughRate",
//       name: "Avg. CTR",
//       value: "3.2%",
//       icon: ArrowUpIcon,
//       change: "+1.2%",
//       changeType: "positive",
//     },
//     {
//       id: "lastCreated",
//       name: "Last Created",
//       value: "2h ago",
//       icon: ClockIcon,
//       change: "-5m",
//       changeType: "negative",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//       {metrics.map((metric) => (
//         <div
//           key={metric.id}
//           className="bg-white overflow-hidden shadow rounded-lg"
//         >
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <metric.icon
//                   className="h-6 w-6 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     {metric.name}
//                   </dt>
//                   <dd>
//                     <div className="text-lg font-medium text-gray-900">
//                       {metric.id === "clickThroughRate"
//                         ? metric.value
//                         : new Intl.NumberFormat().format(metric.value)}
//                     </div>
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-5 py-3">
//             <div className="text-sm">
//               <span
//                 className={`font-medium ${
//                   metric.changeType === "positive"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {metric.change}
//               </span>{" "}
//               <span className="text-gray-500">vs last period</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { LinkIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function DashboardStats({ stats }) {
  const metrics = [
    {
      id: "totalLinks",
      name: "Total Links",
      value: stats?.links || 0,
      icon: LinkIcon,
      change: "+12%",
      changeType: "positive",
    },
    {
      id: "totalClicks",
      name: "Total Clicks",
      value: stats?.clicks || 0,
      icon: ChartBarIcon,
      change: "+24%",
      changeType: "positive",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-50 p-3 rounded-full">
                <metric.icon
                  className="h-8 w-8 text-blue-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-700">
                  {metric.name}
                </h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {new Intl.NumberFormat().format(metric.value)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
