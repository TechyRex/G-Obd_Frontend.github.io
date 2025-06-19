import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './pages/tools/AppContext';
import {
  Dashboard,
  Mechanics,
  Individual,
  Settings,
  Messages,
  Support,
  IndividualRequest,
  IndividualEdit,
  Signup,
  Login,
  Verification,
  ChatUsers,
  CarDiagnoses
} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />

          {/* Protected Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/individual" element={<Individual />} />
          
          {/* Individual Request Routes - both with and without ID */}
          <Route path="/individualRequest" element={<IndividualRequest />} />
          <Route path="/individualRequest/:id" element={<IndividualRequest />} />

          <Route path="/individualEdit" element={<IndividualEdit />} />
          <Route path="/individualEdit/:id" element={<IndividualEdit />} />
          
          <Route path="/car_diagnoses" element={<CarDiagnoses />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />

          {/* Catch-all route for unmatched paths */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;