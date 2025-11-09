import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { DeviceDashboard } from './components/DeviceDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Home Component (Root) ---
export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <DeviceDashboard />
      </Provider>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </DndProvider>
  );
}