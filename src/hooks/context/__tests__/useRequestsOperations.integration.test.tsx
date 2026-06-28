import React from "react"
import { renderHook, act } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import { RequestStatus } from "@/enums/RequestStatus"
import { RequestType } from "@/enums/RequestType"
import { useRequestsOperations } from "@/hooks/context/useRequestsOperations"
import AppProvider from "@/context/AppProvider"

/**
 * Integration tests for user requests management.
 */

const mockRequest: RequestDTO = {
  id: 1,
  malId: 100,
  animeTitle: "Steins;Gate",
  type: RequestType.ADDITION,
  state: RequestStatus.PENDING,
  date: "2024-06-01",
  creator: "user123"
}

describe("Requests Operations Integration Tests", () => {
  it("should add request to list", () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <AppProvider>{children}</AppProvider>
    }

    const { result } = renderHook(() => useRequestsOperations(), { wrapper: Wrapper })

    expect(result.current.requests).toHaveLength(0)
    expect(result.current.requestsState.isEmpty).toBe(true)

    act(() => {
      result.current.addRequestToList(mockRequest)
    })

    expect(result.current.requests).toHaveLength(1)
    expect(result.current.requests[0]?.id).toBe(mockRequest.id)
    expect(result.current.requestsState.isEmpty).toBe(false)
  })

  it("should update request in list", () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <AppProvider>{children}</AppProvider>
    }

    const { result } = renderHook(() => useRequestsOperations(), { wrapper: Wrapper })

    act(() => {
      result.current.addRequestToList(mockRequest)
    })

    const updatedRequest: RequestDTO = {
      ...mockRequest,
      state: RequestStatus.APPROVED
    }

    act(() => {
      result.current.updateRequest(updatedRequest)
    })

    expect(result.current.requests[0]?.state).toBe(RequestStatus.APPROVED)
    expect(result.current.requestsState.totalCount).toBe(1)
  })

  it("should remove request from list", () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <AppProvider>{children}</AppProvider>
    }

    const { result } = renderHook(() => useRequestsOperations(), { wrapper: Wrapper })

    act(() => {
      result.current.addRequestToList(mockRequest)
    })

    expect(result.current.requests).toHaveLength(1)

    act(() => {
      result.current.removeRequest(mockRequest.id)
    })

    expect(result.current.requests).toHaveLength(0)
    expect(result.current.requestsState.isEmpty).toBe(true)
  })

  it("should handle multiple requests lifecycle", () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <AppProvider>{children}</AppProvider>
    }

    const { result } = renderHook(() => useRequestsOperations(), { wrapper: Wrapper })

    const requests = [
      { ...mockRequest, id: 1 },
      { ...mockRequest, id: 2, animeTitle: "Anime 2" },
      { ...mockRequest, id: 3, animeTitle: "Anime 3" }
    ]

    // Add all requests
    act(() => {
      requests.forEach(req => result.current.addRequestToList(req))
    })

    expect(result.current.requestsState.totalCount).toBe(3)

    // Update request 2
    act(() => {
      result.current.updateRequest({
        ...requests[1],
        state: RequestStatus.APPROVED
      })
    })

    expect(result.current.requests[1]?.state).toBe(RequestStatus.APPROVED)

    // Remove request 1
    act(() => {
      result.current.removeRequest(1)
    })

    expect(result.current.requestsState.totalCount).toBe(2)

    // Remove request 3
    act(() => {
      result.current.removeRequest(3)
    })

    expect(result.current.requestsState.totalCount).toBe(1)
    expect(result.current.requests[0]?.id).toBe(2)
  })
})
