import { toast } from "react-hot-toast";

export const handleTryCatch = (asyncFn, options = {}) => {
  return async (...args) => {
    try {
      await asyncFn(...args);
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";

      // Show toast by default
      if (options.toast !== false) {
        toast.error(message);
      }

      // Optionally, you can call a custom onError handler
      if (options.onError) {
        options.onError(err);
      }
    }
  };
};
