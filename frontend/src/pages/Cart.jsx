import React, { useState, useEffect } from "react";
import api from "../api";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getCarrinhos();
    }, []);

    const getCarrinhos = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        api.get("/api/carrinho/view_cart/", config)
            .then((res) => {
                const { cart_items, total_price } = res.data;
                setCartItems(cart_items);
                setTotalPrice(total_price);
                console.log(cart_items);
            })
            .catch((err) => alert(err));
    };

    return (
        <section className="h-100 h-custom">
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="h5">Carrinho de Compras</th>
                                        <th scope="col">Quantidade</th>
                                        <th scope="col">Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={`http://localhost:8000${item.jogo.image}`} className="img-fluid rounded-3" style={{ width: '120px' }} alt={item.jogo.nome_jogo} />
                                                    <div className="flex-column ms-4">
                                                        <p className="mb-2">{item.jogo.nome_jogo}</p>
                                                        <p className="mb-0">{item.jogo.desenvolvedor}</p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="align-middle">
                                                <div className="d-flex flex-row">
                                                    <button className="btn btn-link px-2" onClick={() => decrementQuantity(index)}>
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <input min="0" name="quantity" value={item.quantidade} type="number" className="form-control form-control-sm" style={{ width: '50px' }} readOnly />
                                                    <button className="btn btn-link px-2" onClick={() => incrementQuantity(index)}>
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <p className="mb-0" style={{ fontWeight: '500' }}>${item.jogo.preco}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px' }}>
                            <div className="card-body p-4">

                                <div className="row">
                                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                                        {/* Payment methods */}
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-6">
                                        {/* Payment details */}
                                    </div>
                                    <div className="col-lg-4 col-xl-3">
                                        {/* Order summary */}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;
