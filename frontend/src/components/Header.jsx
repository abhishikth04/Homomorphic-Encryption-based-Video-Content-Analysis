export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-400">
          Secure Video Analysis Dashboard
        </h1>
        <span className="text-sm text-gray-400">
          Homomorphic Encryption • Deep Learning
        </span>
      </div>
    </header>
  );
}
