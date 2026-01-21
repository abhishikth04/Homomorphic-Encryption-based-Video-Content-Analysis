export default function HistoryTable() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-300">
        Analysis History
      </h2>

      <table className="w-full text-left text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">Video</th>
            <th>Score</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2">sample1.mp4</td>
            <td>0.12</td>
            <td className="text-green-400">Unique</td>
            <td>10:42 AM</td>
          </tr>
          <tr>
            <td className="py-2">sample2.mp4</td>
            <td>0.56</td>
            <td className="text-yellow-400">Similar</td>
            <td>10:55 AM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
