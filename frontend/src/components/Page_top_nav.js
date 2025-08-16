import { Link } from 'react-router-dom';

export default function Page_top_nav() {
    // this component has no logic at the moment but setup the nav bar for the site
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-secondary" data-bs-theme="light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-semibold fst-italic text-secondary" href="#">
                        Capstone Group 1
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-4">
                                <Link to={'/'} className="nav-link active" aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown mx-4">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Products
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={'/add'} className="dropdown-item">
                                            Add Product
                                        </Link>
                                        <Link to={'/update'} className="dropdown-item">
                                            Update Product
                                        </Link>
                                        <Link to={'/delete'} className="dropdown-item">
                                            Delete Product
                                        </Link>
                                        <Link to={'/filterproduct'} className="dropdown-item">
                                            Filter Product
                                        </Link>                                                                                                                          
                                    </li>                               
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-4">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Category
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={'/addcategory'} className="dropdown-item">
                                            Add Category
                                        </Link>
                                        <Link to={'/updatecategory'} className="dropdown-item">
                                            Update Category
                                        </Link>
                                        <Link to={'/filtercategory'} className="dropdown-item">
                                            Filter Category
                                        </Link>
                                    </li>                               
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-4">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Users
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={'/registeruser'} className="dropdown-item">
                                            Register User
                                        </Link>
                                        <Link to={'/filteruser'} className="dropdown-item">
                                            Filter User
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
