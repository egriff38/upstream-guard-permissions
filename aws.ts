import { group, pattern } from "./types.ts"

export const awsRead = group("aws:read", {
  description: "Read-only AWS CLI operations",
  defaultScope: "persistent",
  patterns: [
    pattern(/^aws\s+s3\s+ls\b/),
    pattern(/^aws\s+(cloudformation|cfn)\s+(describe|list|get|validate)\b/),
    pattern(/^aws\s+logs\s+(tail|filter-log-events|describe|get)\b/),
    pattern(/^aws\s+ssm\s+(get|list|describe)\b/),
    pattern(/^aws\s+lambda\s+(list|get)\b/),
    pattern(/^aws\s+sts\s+get-caller-identity\b/),
    pattern(/^aws\s+sso\s+login\b/),
    pattern(/^aws\s+stepfunctions\s+(list|describe|get)\b/),
    pattern(/^aws\s+secretsmanager\s+(list|describe|get)\b/),
  ],
})
