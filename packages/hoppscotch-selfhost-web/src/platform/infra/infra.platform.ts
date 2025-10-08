import { runGQLQuery } from "@hoppscotch/common/helpers/backend/GQLClient"
import { InfraPlatformDef } from "@hoppscotch/common/platform/infra"
import { GetSmtpStatusDocument } from "@api/generated/graphql"
import * as E from "fp-ts/Either"

const getSMTPStatus = () => {
  return runGQLQuery({
    query: GetSmtpStatusDocument,
    variables: {},
  })
}

export const InfraPlatform: InfraPlatformDef = {
  getIsSMTPEnabled: async () => {
    const res = await getSMTPStatus()

    if (E.isRight(res)) {
      return E.right(res.right.isSMTPEnabled)
    }

    return E.left("SMTP_STATUS_FETCH_FAILED")
  },
  getProxyAppUrl: async () => {
    // Get proxy URL from environment variable or fallback to window origin
    const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin
    const proxyUrl = `${baseUrl}/proxy`

    return E.right({
      value: proxyUrl,
      name: "Self-Hosted Proxy",
    })
  },
}
