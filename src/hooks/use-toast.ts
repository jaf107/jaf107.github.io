import { Toast } from "@optiaxiom/react";

export const useToast = () => {
  return {
    toast: (message: string) => {
      Toast({
        content: message,
        type: "foreground",
        duration: 3000
      });
    }
  };
};

export { Toast };
