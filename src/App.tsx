import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from './modules/common/components/Layout';
import NoMatch from './modules/common/components/NoMatch';
import DataTable from './modules/customer-analytics/components/DataTable';


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Layout />} />
                    <Route path="data-table" element={<DataTable />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes >
            </BrowserRouter>
        </>
    )
}

export default App
