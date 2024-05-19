import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { api } from "../../services/api"


import { Container, Form } from './styles'

export function New(){

    const [title, setTitle] = useState("")
    const [descriptions, setDescriptions] = useState("")


    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")
    
    const navigate = useNavigate()
    
    function handleBack(){
        navigate(-1)
      }

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]) //acessamos tudo que tinha antes de links
        setNewLink("")
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]) //pego tudo que tinha no estado anterior, todas as tags que ja tinha com o spread operator. Com o spread todoas as tagas ficam no mesmo nivel
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))  //O filter retorna um novo objeto, neste caso, vai retornar todas as tags menos a que queremos deletar. Ela vê pelo index da tag.    
    }

    async function handleNewNote() {
        
        if(!title) {
            return alert("Por favor, digite o Título da Nota!")
        }
        
        if(newLink) {
            return alert("Você deixou um LINK no campo para adicionar, mas não adicionou. Clique no ícone de +")
        }
        
        if(newTag) {
            return alert("Você deixou uma TAG no campo para adicionar, mas não adicionou. Clique no ícone de +")
        }

        await api.post("/notes", {
            title,
            descriptions,
            tags,
            links
        })

        alert("Nota Cadastrada com sucesso.")
        navigate(-1)
    }

    return(
       <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText 
                            title="Voltar" 
                            onClick={handleBack}
                        />
                    </header>

                    <Input
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextArea 
                        placeholder="Observações"
                        onChange={e => setDescriptions(e.target.value)}
                    />

                    <Section title="Links Úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)} 
                                    value={link}
                                    onClick={() => handleRemoveLink(link)} //quando tem parametro que queremos passar, é necessário usar ArrowFunction. Senão ele fica tentando executar automaticamente sempre a função.
                                />
                            ))
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />

                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            
                            <NoteItem 
                                isNew
                                placeholder="Nova tag"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />

                        </div>
                    </Section>

                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
       </Container> 

    )

}