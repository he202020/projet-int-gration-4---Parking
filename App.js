import { AuthProvider } from "./security/AuthContext";
import { AppDisplay } from "./navigation/AppDisplay";


export default function App() {
    return (
        <AuthProvider>
            <AppDisplay></AppDisplay>
        </AuthProvider>
    )
}
