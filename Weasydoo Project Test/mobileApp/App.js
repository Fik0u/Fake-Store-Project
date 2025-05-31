import { StatusBar } from 'expo-status-bar';
import AppNavigator from './AppNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </>
  );
}
