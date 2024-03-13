import { isRouteErrorResponse, useRouteError } from "react-router-dom"

const RootBoundary = () => {
  const error = useRouteError()
  console.error("🚀 ~ RootBoundary ~ error:", error)

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>La page n&apos;existe pas</div>
    }

    if (error.status === 401) {
      return <div>Vous n&apos;êtes pas authorisé à voir ce contenue</div>
    }

    if (error.status === 503) {
      return <div>Erreur Interne</div>
    }
  }

  return <div>Quelques chose s&apos;est mal passé</div>
}

export default RootBoundary
