import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import GlobalStyles from "./styles/GlobalStyles.js"
import { CommentsProvider } from "./contexts/CommentsContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CommentsProvider>
      <GlobalStyles />
      <App />
    </CommentsProvider>
  </React.StrictMode>
)
