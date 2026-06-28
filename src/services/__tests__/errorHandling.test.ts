import { describe, expect, it } from "vitest"

import ResponseError from "@/interfaces/services/ResponseError"
import { ErrorType, isRecoverableError, requiresReAuth, standardizeError } from "../errorHandling"

describe("errorHandling", () => {
  describe("standardizeError", () => {
    it("categorizes network errors correctly", () => {
      const error = new ResponseError("Network failed", new Response("", { status: 0 }))
      error.response = undefined

      const result = standardizeError(error)

      expect(result.type).toBe(ErrorType.NETWORK)
      expect(result.message).toContain("réseau")
    })

    it("categorizes 401 as UNAUTHORIZED", () => {
      const mockResponse = new Response("", { status: 401 })
      const error = new ResponseError("Unauthorized", mockResponse)
      error.response = mockResponse

      const result = standardizeError(error)

      expect(result.type).toBe(ErrorType.UNAUTHORIZED)
      expect(result.statusCode).toBe(401)
    })

    it("categorizes 403 as FORBIDDEN", () => {
      const mockResponse = new Response("", { status: 403 })
      const error = new ResponseError("Forbidden", mockResponse)
      error.response = mockResponse

      const result = standardizeError(error)

      expect(result.type).toBe(ErrorType.FORBIDDEN)
      expect(result.statusCode).toBe(403)
    })

    it("categorizes 404 as NOT_FOUND", () => {
      const mockResponse = new Response("", { status: 404 })
      const error = new ResponseError("Not found", mockResponse)
      error.response = mockResponse

      const result = standardizeError(error)

      expect(result.type).toBe(ErrorType.NOT_FOUND)
    })

    it("categorizes 409 as CONFLICT", () => {
      const mockResponse = new Response("", { status: 409 })
      const error = new ResponseError("Conflict", mockResponse)
      error.response = mockResponse

      const result = standardizeError(error)

      expect(result.type).toBe(ErrorType.CONFLICT)
    })

    it("categorizes 5xx as SERVER_ERROR", () => {
      const mockResponse = new Response("", { status: 500 })
      const error = new ResponseError("Server error", mockResponse)
      error.response = mockResponse

      const result = standardizeError(error)

      expect(result.type).toBe(ErrorType.SERVER_ERROR)
    })

    it("handles null or undefined errors", () => {
      const result1 = standardizeError(null)
      const result2 = standardizeError(undefined)

      expect(result1.type).toBe(ErrorType.UNKNOWN)
      expect(result2.type).toBe(ErrorType.UNKNOWN)
    })
  })

  describe("isRecoverableError", () => {
    it("considers NETWORK errors recoverable", () => {
      const error = { type: ErrorType.NETWORK, message: "" }
      expect(isRecoverableError(error)).toBe(true)
    })

    it("considers UNAUTHORIZED errors recoverable", () => {
      const error = { type: ErrorType.UNAUTHORIZED, message: "" }
      expect(isRecoverableError(error)).toBe(true)
    })

    it("does not consider SERVER_ERROR recoverable", () => {
      const error = { type: ErrorType.SERVER_ERROR, message: "" }
      expect(isRecoverableError(error)).toBe(false)
    })
  })

  describe("requiresReAuth", () => {
    it("returns true only for UNAUTHORIZED errors", () => {
      expect(requiresReAuth({ type: ErrorType.UNAUTHORIZED, message: "" })).toBe(true)
      expect(requiresReAuth({ type: ErrorType.FORBIDDEN, message: "" })).toBe(false)
      expect(requiresReAuth({ type: ErrorType.SERVER_ERROR, message: "" })).toBe(false)
    })
  })
})
