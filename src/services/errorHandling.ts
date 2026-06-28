import type ResponseError from "@/interfaces/services/ResponseError"

export enum ErrorType {
  NETWORK = "NETWORK",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  SERVER_ERROR = "SERVER_ERROR",
  UNKNOWN = "UNKNOWN"
}

export interface StandardizedError {
  type: ErrorType
  message: string
  statusCode?: number
  originalError?: ResponseError
}

/**
 * Standardizes API errors into a unified format for consistent handling across the application.
 * Enables clearer distinction between network, auth, and business errors.
 */
export const standardizeError = (error: unknown): StandardizedError => {
  if (!error) {
    return {
      type: ErrorType.UNKNOWN,
      message: "Une erreur inconnue s'est produite"
    }
  }

  if (error instanceof Error && "response" in error) {
    const apiError = error as ResponseError
    const status = apiError.response?.status

    if (!status) {
      return {
        type: ErrorType.NETWORK,
        message: "Erreur réseau. Veuillez vérifier votre connexion.",
        originalError: apiError
      }
    }

    if (status === 401) {
      return {
        type: ErrorType.UNAUTHORIZED,
        message: "Vous devez vous authentifier.",
        statusCode: status,
        originalError: apiError
      }
    }

    if (status === 403) {
      return {
        type: ErrorType.FORBIDDEN,
        message: "Vous n'avez pas la permission d'accéder à ce contenu.",
        statusCode: status,
        originalError: apiError
      }
    }

    if (status === 404) {
      return {
        type: ErrorType.NOT_FOUND,
        message: "La ressource demandée n'existe pas.",
        statusCode: status,
        originalError: apiError
      }
    }

    if (status === 409) {
      return {
        type: ErrorType.CONFLICT,
        message: "Une ressource avec ces données existe déjà.",
        statusCode: status,
        originalError: apiError
      }
    }

    if (status >= 500) {
      return {
        type: ErrorType.SERVER_ERROR,
        message: "Une erreur serveur s'est produite. Veuillez réessayer.",
        statusCode: status,
        originalError: apiError
      }
    }

    return {
      type: ErrorType.UNKNOWN,
      message: "Une erreur est survenue.",
      statusCode: status,
      originalError: apiError
    }
  }

  if (error instanceof Error) {
    return {
      type: ErrorType.UNKNOWN,
      message: error.message || "Une erreur inconnue s'est produite"
    }
  }

  return {
    type: ErrorType.UNKNOWN,
    message: "Une erreur inconnue s'est produite"
  }
}

/**
 * Determines if the error is user-recoverable (e.g., network, auth) vs critical (server).
 */
export const isRecoverableError = (standardError: StandardizedError): boolean => {
  return [ErrorType.NETWORK, ErrorType.UNAUTHORIZED, ErrorType.CONFLICT].includes(standardError.type)
}

/**
 * Determines if the error requires re-authentication.
 */
export const requiresReAuth = (standardError: StandardizedError): boolean => {
  return standardError.type === ErrorType.UNAUTHORIZED
}
