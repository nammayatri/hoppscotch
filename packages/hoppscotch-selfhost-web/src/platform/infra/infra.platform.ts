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
    // Hardcoded self-hosted proxy URL
    return E.right({
      value: "https://hoppscotch.internal.integ.movingtech.net/proxy",
      name: "Self-Hosted Proxy",
    })
  },
}
