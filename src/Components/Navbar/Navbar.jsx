import './Navbar.css'
import logo from '../../assets/154622676-design-de-ilustração-de-ícone-de-vetor-de-logotipo-de-letra-p.jpg'
export default function Navbar() {
    return (
        <>
            <nav className=" navbar navbar-expand-lg bg-primary ">
                <div class="container-fluid p-0">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="logo" width={56} className='logo' />
                    </a>
                    <button
                        className="navbar-toggler p-3 border-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"
                        
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse bg-primary p-3" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form class="d-flex p-1" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn  btn-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav >
        </>
    )
}