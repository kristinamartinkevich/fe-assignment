import { Link } from "react-router-dom";

function Layout() {

    return (
        <>
            <h1>'Customer Analytics'</h1>
            <div className="card">
                <Link to="/data-table">Go to Data Table</Link>
            </div>
        </>
    )
}

export default Layout