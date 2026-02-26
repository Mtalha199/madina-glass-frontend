import apiClient from "@/lib/api/config";


export const fetchProspectLeads = async (listId: string) => {
  const response = await apiClient.get(`/prospects/${listId}`);
  return response.data.data;
};

export const updateLeadStatus = async (leadId: number, data: { status: string; internalStatus: string }) => {
  const response = await apiClient.patch(`/prospects/lead/${leadId}`, data);
  return response.data;
};