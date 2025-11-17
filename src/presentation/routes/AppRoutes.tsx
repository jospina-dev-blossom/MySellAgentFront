import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage, CustomizationPage, LoginPage } from '@presentation/pages';
import { ProtectedRoute } from '@presentation/components/common/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/customize" 
          element={
            <ProtectedRoute>
              <CustomizationPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

