export default function StatusPopup({
  show,
  type,
  message,
  onClose,
}: {
  show: boolean;
  type: "loading" | "success" | "error" | "warning";
  message: string;
  onClose?: () => void;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
        {type === "loading" && (
          <div className="mx-auto mb-4 w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        )}

        {type === "success" && <div className="text-4xl mb-3">✅</div>}
        {type === "error" && <div className="text-4xl mb-3">❌</div>}
        {type === "warning" && <div className="text-4xl mb-3">⚠️</div>}

        <p className="text-gray-800 font-semibold whitespace-pre-line">
          {message}
        </p>

        {type !== "loading" && (
          <button
            onClick={onClose}
            className="mt-5 bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}
