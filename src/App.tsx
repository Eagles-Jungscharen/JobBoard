import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { OverviewPage } from './pages/OverviewPage'
import { DetailPage } from './pages/DetailPage'

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/jobs/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </FluentProvider>
  )
}

export default App
