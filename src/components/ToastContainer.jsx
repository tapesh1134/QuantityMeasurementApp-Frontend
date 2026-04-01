import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../store/toastSlice";
import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = toasts.map((t) =>
      setTimeout(() => {
        dispatch(removeToast(t.id));
      }, 4000)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

  return (
    <div className="fixed bottom-6 right-6 space-y-4 z-150">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-start gap-4 w-[360px] p-5 rounded-2xl shadow-2xl
                     bg-slate-800 text-white border border-slate-700
                     animate-slide-in"
        >
          {/* Icon */}
          <div className="mt-1 flex items-center justify-center w-9 h-9 rounded-full bg-slate-700">
            {t.type === "success" && (
              <CheckCircle className="text-green-400" size={20} />
            )}
            {t.type === "error" && (
              <XCircle className="text-red-400" size={20} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="font-semibold text-base leading-tight">
              {t.title}
            </p>
            <p className="text-sm text-slate-300 mt-1">
              {t.message}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => dispatch(removeToast(t.id))}
            className="p-1 rounded-md hover:bg-slate-700 transition"
          >
            <X size={18} className="text-slate-400 hover:text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}