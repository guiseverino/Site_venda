import React, { useState, useEffect } from "react";
import api from "../api";
import carrinho from "../images/carrinho.png";
import { Link } from 'react-router-dom';


function Header() {
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);

    useEffect(() => {
        getCarrinhos();
    }, []);

    const getCarrinhos = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        api.get("/api/carrinho/count_items/", config)
            .then((res) => {
                const count = res.data.count;
                setQuantidadeTotal(count);
            })
            .catch((err) => alert(err));
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#!">All Products</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link to="/carrinho" className="btn btn-outline-dark" type="button">
                            <img src={carrinho} alt="Carrinho" className="bi-cart-fill me-1" style={{ width: '20px', height: '20px' }} />
                            <i className="bi-cart-fill me-1" />
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{quantidadeTotal}</span>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Header;
