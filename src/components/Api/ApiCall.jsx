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
            title: error?.response?.data?.detail || "Something went wrong",
          });
        } finally {
          setloading(false);
        }
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
        try {
          const setloadingExist = typeof setloading === "function";
          if (setloadingExist) {
            setloading(true);
          }
          const response = await axios.get(API_URL, { params: DATA });
          setData(response?.data?.data);
          setCount(response?.data?.count);
        } catch (error) {
          debugger
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

};
