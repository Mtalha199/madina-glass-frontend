import { API_TYPE } from "@/Constant";
import axios from "./Axios";
import { toast } from "@/hooks/use-toast";

export const APICALL = async (
  METHOD,
  API_URL,
  setloading,
  setData,
  setCount,
  DATA = null,
  toastMessage = null
) => {
  try {
    switch (METHOD) {
      case "post":
        const response = await axios.post(API_URL, DATA);
        if (toastMessage) {
          // toast.success(`${toastMessage} added succesfully`);
        }
        return response.data.data;
        break;
      case "patch":
        try {
          const response = await axios.patch(API_URL, DATA);
          // toast.success(`${toastMessage} updated succesfully`);
          return response.data.data;
        } catch (error) {
          const e = error?.response?.data?.title;
          toast.error(e || error);
        }
        break;

      case API_TYPE.GET:
        const setloadingExist = typeof setloading === "function";
        if (setloadingExist) {
          setloading(true);
        }
        try {
          const response = await axios.get(API_URL, { params: DATA });
          setData(response?.data?.data);
          setCount(response?.data?.count);
        } catch (error) {
          toast({
            variant: "destructive",
            title: error?.response?.data?.detail || "Something went wrong",
          });
        } finally {
          setloading(false);
        }
        break;
      case "delete":
        try {
        } catch (error) {}
    }
  } catch (error) {
    const e = error?.response?.data?.title;
    toast.error(e || error);
  }
};
