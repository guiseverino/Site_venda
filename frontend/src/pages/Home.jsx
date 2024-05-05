import { useState, useEffect } from "react"
import api from "../api"
import Jogo from "../components/Jogo"
import Header from "../components/Header"

function Home() {

    const [jogos, setJogos] = useState([]);
    const [nome_jogo, setNomeJogo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [data_lancamento, setDataLancamento] = useState('');
    const [classificacao_etaria, setClassificacaoEtaria] = useState('');
    const [genero, setGenero] = useState('');
    const [image, setImage] = useState('');
    const [desenvolvedor, setDesenvolvedor] = useState('');
    useEffect(() => {
        getJogos();
    }, [])
    const getJogos = () => {
        api.get("/api/jogo/").then((res) => res.data)
            .then((data) => { setJogos(data); console.log(data) })
            .catch((err) => alert(err));
    }
    const createJogo = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome_jogo', nome_jogo);
        formData.append('descricao', descricao);
        formData.append('preco', preco);
        formData.append('data_lancamento', data_lancamento);
        formData.append('classificacao_etaria', classificacao_etaria);
        formData.append('genero', genero);
        formData.append('desenvolvedor', desenvolvedor);
        formData.append('image', image);

        api.post("/api/jogo/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.status === 201) alert("Jogo Criado")
            else alert("Falhou na criação do jogo")
        }).catch((err) => alert(err))

        getJogos();
    };

    return <div>
        <Header />

        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                {jogos.map((jogo) => (
                    jogo.id_jogo && <Jogo jogo={jogo} key={jogo.id_jogo} />
                ))}
            </div>
        </div>

        <h2>Criar Jogo</h2>
        <form onSubmit={createJogo}>
            <label htmlFor="title">Nome do Jogo:</label>
            <br />
            <input
                type="text"
                id="nome_jogo"
                name="nome_jogo"
                required
                onChange={(e) => setNomeJogo(e.target.value)}
                value={nome_jogo}
            />
            <label htmlFor="descricao">Descrição:</label>
            <br />
            <textarea
                id="descricao"
                name="descricao"
                required
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
            ></textarea>

            <label htmlFor="preco">Preço:</label>
            <br />
            <input
                type="number"
                id="preco"
                name="preco"
                step="0.01"
                required
                onChange={(e) => setPreco(parseFloat(e.target.value))}
                value={preco}
            />

            <label htmlFor="data_lancamento">Data de Lançamento:</label>
            <br />
            <input
                type="date"
                id="data_lancamento"
                name="data_lancamento"
                required
                onChange={(e) => setDataLancamento(e.target.value)}
                value={data_lancamento}
            />

            <label htmlFor="classificacao_etaria">Classificação Etária:</label>
            <br />
            <input
                type="text"
                id="classificacao_etaria"
                name="classificacao_etaria"
                required
                onChange={(e) => setClassificacaoEtaria(e.target.value)}
                value={classificacao_etaria}
            />

            <label htmlFor="genero">Gênero:</label>
            <br />
            <input
                type="text"
                id="genero"
                name="genero"
                required
                onChange={(e) => setGenero(e.target.value)}
                value={genero}
            />

            <label htmlFor="desenvolvedor">Desenvolvedor:</label>
            <br />
            <input
                type="text"
                id="desenvolvedor"
                name="desenvolvedor"
                required
                onChange={(e) => setDesenvolvedor(e.target.value)}
                value={desenvolvedor}
            />

            <label htmlFor="Image">Image:</label>
            <br />
            <input
                type="file"
                id="Image"
                name="Image"
                required
                onChange={(e) => setImage(e.target.files[0])}
            />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
}
export default Home