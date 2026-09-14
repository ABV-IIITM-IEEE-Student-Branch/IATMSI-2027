import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DynamicPage from './pages/DynamicPage';
import { pageRegistry } from './data/pageRegistry';
import ScrollToTop from './components/layout/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* Dynamically register all pages from the registry */}
          {pageRegistry.map(page => (
            <Route key={page.id} path={page.path} element={<DynamicPage pageId={page.id} />} />
          ))}

          {/* Backward compatibility: old call-for-papers URLs */}
          <Route path="/call-for-papers/guidelines" element={<Navigate to="/call-for-papers/paper-submission" replace />} />
          <Route path="/call-for-papers/camera-ready" element={<Navigate to="/call-for-papers/paper-submission" replace />} />
          <Route path="/paper-submission" element={<Navigate to="/call-for-papers/paper-submission" replace />} />

          {/*
              Anything unrecognised goes home.

              Without this an unmatched path rendered nothing at all — not a
              message, not even the header and footer, just a white page. That
              was always true of a typo, and became reachable the moment the
              policy pages were removed: /terms and /privacy had been live and
              may still be linked from elsewhere.
          */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
