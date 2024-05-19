import { useState } from 'react'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api"

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background } from "./styles";

export function SignUp() {
    
    const [name, setName] = useState("")  //Estado
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignUP() {
        
        if(!name || !email || !password) {
           return alert("Preencha todos os campos!")
        }

        api.post("/users", { name, email, password })
        .then(() => {
            alert("Usuário cadastrado com sucesso!")
            navigate("/")
        })
        .catch(error => {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert("Não foi possível cadastrar o usuário")
            }
        })
    }

    return(
        <Container>
            <Background />
            <Form>
                <h1>Rocketnotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>
 
                <h2>Crie a sua conta</h2>

                <Input 
                    placeholder="nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="e-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Cadastrar" onClick={handleSignUP}/>

                <Link to="/">
                    Voltar para o login
                </Link>
            </Form>
            

        </Container>

    )

}