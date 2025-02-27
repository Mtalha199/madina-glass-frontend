import { API_TYPE } from "@/Constant";
import axios from "./Axios";
import { toast } from "@/hooks/use-toast";

export const APICALL = async (
  METHOD,
  API_URL,
  setloading,
  DATA = null,
  setData,
  setCount,
  toastMessage = null
) => {

  const setloadingExist = typeof setloading === "function";
  if (setloadingExist) {
    setloading(true);
  }
  try {
    let response;

    switch (METHOD) {
      case API_TYPE.POST:
        response = await axios.post(API_URL, DATA);
        break;

      case API_TYPE.PATCH:
        response = await axios.patch(API_URL, DATA);
        break;

      case API_TYPE.PUT:
        response = await axios.put(API_URL, DATA);
        break;

      case API_TYPE.GET:
        response = await axios.get(API_URL, { params: DATA });
        if (typeof setData === "function") {
          setData(response?.data?.data);
        }
        if (typeof setCount === "function") {
          setCount(response?.data?.total);
        }
        break;

      case API_TYPE.DELETE:
        response = await axios.delete(API_URL, { data: DATA });
        break;

      default:
        throw new Error("Invalid request method");
    }

    if (toastMessage) {
      toast({
        description: toastMessage,
      });
    }

    return { data: response?.data, success: true };
  } catch (error) {
    toast({
      variant: "destructive",
      title: error?.response?.data?.error || "Something went wrong",
    });
  } finally {
    setloading(false);
  }
};