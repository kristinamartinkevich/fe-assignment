import './assets/styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './modules/common/components/Home';
import NoMatch from './modules/common/components/NoMatch';
import CustomerAnalytics from './modules/customer-analytics/components/CustomerAnalytics';
import NavigationBar from './modules/common/components/NavigationBar';

function App() {

    return (
        <>
            <NavigationBar />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="customer-analytics" element={<CustomerAnalytics />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes >
            </BrowserRouter>
        </>
    )
}

export default App
