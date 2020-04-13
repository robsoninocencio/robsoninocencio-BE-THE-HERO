import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function RecuperarID() {

    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = { email };
        
        try{
            const response = await api.post('ongs/recuperarID', data);
            alert(`Seu ID: ${response.data.id}`);
            history.push('/');
        }catch(err){
            alert('Erro na Busca');
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Recuperar ID</h1>
                    <p>Entre com o email cadastrado para sua Instituição e mandaremos um email com seu ID.</p>
               
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input type="email" placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <button className="button">Recuperar</button>
                </form>

            </div>
        </div>
    );
}