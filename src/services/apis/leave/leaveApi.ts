import {apiMethod, endpoint} from '../../config/apiConstants';
import backendBaseApi from '../../config/backendBaseApi';

const LeaveService = backendBaseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    getLeavetype: build.query({
      query: () => ({
        url: endpoint.getLeavetype,
        method: apiMethod.get,
      }),
    }),
    applyLeave: build.mutation({
      query: (data: any) => {
        const url = endpoint.applyLeave;
        console.log('Apply Leave URL:', url);
        return {
          url,
          method: apiMethod.post,
          body: data,
        };
      },
    }),
  }),
});

export const {useGetLeavetypeQuery, useApplyLeaveMutation} = LeaveService;
