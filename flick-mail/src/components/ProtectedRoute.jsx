import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const flickuserId = localStorage.getItem('flickuserId');
  
  if (!flickuserId) {
    
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 