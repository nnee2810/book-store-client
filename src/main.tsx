import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { handleApiError } from "helpers/apiError"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "styles/index.css"
import App from "./App"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: handleApiError,
    },
    mutations: {
      onError: handleApiError,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
)
