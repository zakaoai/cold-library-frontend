export type AuthorizationLevel = "anonymous" | "user" | "admin"

export interface WithAuthorizationOptions {
  minLevel: AuthorizationLevel
}
