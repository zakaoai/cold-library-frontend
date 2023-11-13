import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

const prepare = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser")
    void worker.start()
  }
}

const rootDom = document.getElementById("root")
if (rootDom != null) {
  await prepare().finally(() => {
    createRoot(rootDom).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
}
