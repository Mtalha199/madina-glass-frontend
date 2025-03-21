import { APICALL } from "../Api/ApiCall";
import { API_TYPE } from "@/Constant";
const TimeDiffrenceInMinutes = (createdDate) => {
  const newCreatedDate=new Date(createdDate)
  const currentTime = new Date();
  const timeDifferenceInMinutes = (currentTime - newCreatedDate) / (1000 * 60);
  return timeDifferenceInMinutes;
}
export const pollInProgressItems = (
  DATA,
  MAX_POLLING_TIME = 20,
  setLoaderDownload,
  INTERVEL = 5000,
  API_END_POINT,
  CONDITION_TO_FULLFILL
) => {
  const checkPendingItems = () => {
    if (!Array.isArray(DATA) || DATA.length === 0) return;
    const pendingItems = DATA.filter((item) => item.state !== CONDITION_TO_FULLFILL);
    const newLoadingState = {};
    pendingItems.forEach((item) => {
      const newTimeDiffrenceInMinutes = TimeDiffrenceInMinutes(item.createdAt);
      if (newTimeDiffrenceInMinutes < MAX_POLLING_TIME) {
        newLoadingState[item.id] = true;
      }
    });

    setLoaderDownload(newLoadingState);
    if (pendingItems.length > 0) {
      pendingItems.forEach(async (row) => {
      const newTimeDiffrenceInMinutes = TimeDiffrenceInMinutes(row?.createdAt);
        if (newTimeDiffrenceInMinutes < MAX_POLLING_TIME) {
          const checkStatus = async () => {
            const response = await APICALL(
              API_TYPE.GET,
              `${API_END_POINT}/${row.id}`,
              () => {},
              null,
              () => {},
              () => {}
            );
            const  newTimeDiffrenceInMinutes = TimeDiffrenceInMinutes(response.data.data?.createdAt);
            if (response.data.data.state === CONDITION_TO_FULLFILL) {
              delete newLoadingState[response.data.data.id];
              setLoaderDownload({ ...newLoadingState });
            } else if (newTimeDiffrenceInMinutes > MAX_POLLING_TIME) {
              delete newLoadingState[response.data.data.id];
              setLoaderDownload({ ...newLoadingState });
            } else {
              setTimeout(checkStatus, INTERVEL);
            }
          };  
        checkStatus();

        }
      });
    }
  };
  checkPendingItems();
};
