import React from "react";
import api from "../api"


function Jogo({ jogo }) {
    const addCart = () => {
        api.post(`/api/carrinho/${jogo.id_jogo}/add_to_cart/`)
            .then((response) => {
                alert("Item adicionado ao carrinho!");
            })
            .catch(error => {
                console.error("Erro ao adicionar item ao carrinho:", error)
            })
    }
    return (
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src={jogo.image} alt={jogo.nome_jogo} style={{ width: '268px', height: '178px' }}/>
                <div className="card-body p-3">
                    <div className="text-center">
                        <h5 className="fw-bolder">{jogo.nome_jogo}</h5>
                        <p>{jogo.preco}</p>
                    </div>
                </div>
                <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button className="btn btn-outline-dark mt-auto" onClick={addCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jogo;
