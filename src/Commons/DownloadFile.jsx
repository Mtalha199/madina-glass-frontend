import { AUTHENTICATION_VALUE } from "@/Constant";
import { toast } from "@/hooks/use-toast";

export const DOWNLOADFILE = async (
  URL,
  FILE_NAME,
  setLoading,
  TOAST_MESSAGE,
  AUTH_REQUIRE = true
) => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    setLoading(true);
    const headers = {
      "Content-Type": "text/csv",
    };
    if (AUTH_REQUIRE) {
      const authToken = localStorage.getItem(AUTHENTICATION_VALUE.AUTH_TOKEN);
      if (authToken) {
        headers.Authorization = "bearer " + authToken;
      } else {
        toast.error({
          variant: "destructive",
          description: "Authentication token not found",
        });
        return;
      }
    }
    try {
      const response = await fetch(`${baseURL}${URL}`, {
        method: "GET",
        headers,
      });
      if(!response.ok) {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Something went wrong",
        });
        return;
      }
      else{
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${FILE_NAME}.csv`);
        document.body.appendChild(link);
        link.click();
        toast({
          description: TOAST_MESSAGE,
        });
        link.parentNode.removeChild(link);
      }
      return true

    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error || "Something went wrong",
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: error?.response?.data?.error || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};
