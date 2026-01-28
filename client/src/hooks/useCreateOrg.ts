import { useMutation } from "@tanstack/react-query";
import type { paths } from "@/types/api_schema";

import { organizationsClient } from "@/services/APIClient";

export type OrgCreateAPI =
  paths["/organizations"]["post"]["requestBody"]["content"]["application/json"];

type OrgCreateResponseAPI =
  paths["/organizations"]["post"]["responses"]["201"]["content"]["application/json"];

export function useCreateOrg() {
  return useMutation({
    mutationFn: async (data: OrgCreateAPI) => {
      return await organizationsClient.post<OrgCreateResponseAPI>(data);
    },
  });
}
