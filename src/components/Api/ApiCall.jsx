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
    switch (METHOD) {
      case API_TYPE.POST:
        try {
          const setloadingExist = typeof setloading === "function";
          if (setloadingExist) {
            setloading(true);
          }
          const response = await axios.post(API_URL, DATA);
          if (toastMessage) {
            toast({
              description: toastMessage,
            });
          }
          return response;
        } catch (error) {
          toast({
            variant: "destructive",
            title:  error?.response?.data.error || "Something went wrong",
          });
        } finally {
          setloading(false);
        }
        break;

      case API_TYPE.PATCH:
        try {
          const setloadingExist = typeof setloading === "function";
          if (setloadingExist) {
            setloading(true);
          }
          const response = await axios.patch(API_URL, DATA);
          if (toastMessage) {
            toast({
              description: toastMessage,
            });
          }
          return response
        } catch (error) {
          toast({
            variant: "destructive",
            title:  error?.response?.data.error || "Something went wrong",
          });
        }finally {
          setloading(false);
        }
        break;

      case API_TYPE.GET:
        try {
          const setloadingExist = typeof setloading === "function";
          if (setloadingExist) {
            setloading(true);
          }
          const response = await axios.get(API_URL, { params: DATA });
          setData(response?.data?.data);
          setCount(response?.data?.total);
        } catch (error) {
          toast({
            variant: "destructive",
            title: error?.response?.data.error || "Something went wrong",
          });
        } finally {
          setloading(false);
        }
        break;
      case API_TYPE.DELETE:
        try {
          const setloadingExist = typeof setloading === "function";
        if (setloadingExist) {
          setloading(true);
        }
        const response = await axios.delete(API_URL, { data: DATA });
        if (toastMessage) {
          toast({
            description: toastMessage,
          });
        }
        return response;
        } catch (error) {
          toast({
            variant: "destructive",
            title: error?.response?.data.error|| "Something went wrong",
          });
        } finally {
          setloading(false);
        }
        break;
    }

};
