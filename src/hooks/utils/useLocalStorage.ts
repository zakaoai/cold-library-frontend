import { useCallback, useEffect, useSyncExternalStore, type Dispatch, type SetStateAction } from "react"

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }))
}

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(key, stringifiedValue)
  dispatchStorageEvent(key, stringifiedValue)
}

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const getLocalStorageItem = (key: string) => window.localStorage.getItem(key)

const useLocalStorageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener("storage", callback)
  }
}

const getLocalStorageServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook")
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => getLocalStorageItem(key)

  const store = useSyncExternalStore(useLocalStorageSubscribe, getSnapshot, getLocalStorageServerSnapshot)

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (v: T | ((prev: T) => T)) => {
      try {
        const nextState = typeof v === "function" ? (v as (prev: T) => T)(JSON.parse(store ?? "") as T) : v

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key)
        } else {
          setLocalStorageItem<T>(key, nextState)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    [key, store]
  )

  useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof initialValue !== "undefined") {
      setLocalStorageItem<T>(key, initialValue)
    }
  }, [key, initialValue])

  return [store != null ? (JSON.parse(store) as T) : initialValue, setState] as [a: T, b: typeof setState]
}
