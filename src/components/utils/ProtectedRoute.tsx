import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Por ahora, simplemente renderiza los children sin autenticación
  // En el futuro se puede implementar autenticación real
  return <>{children}</>;
}
