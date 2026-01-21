import UploadCard from "./UploadCard";

export default function UploadSection({ sectionRef, onStart, onResult }) {
  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gray-900 flex items-center px-6 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">
          Upload Video for Secure Analysis
        </h2>

        <UploadCard onStart={onStart} onResult={onResult} />
      </div>
    </section>
  );
}
