import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import {Header} from '../../components/Header'
import {ButtonText} from '../../components/ButtonText'
import { FiPlus } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { api } from '../../services/api'


export function Home(){
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    
    const [search, setSearch] = useState("")
    const [notes, setNotes] = useState([])

    const navigate = useNavigate()


    function handleTagSelected(tagName){
        if(tagName === "all") {
            return setTagsSelected([])
            
        }

        const alreadySelected = tagsSelected.includes(tagName)
        
        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName])
        }

    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags()
    },[]) // quando deixamos o array vazio o useEffect é executado 1 vez só. Só quando o componente é renderizado

    useEffect(() => { 
        
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fetchNotes()
    },[tagsSelected, search]) // quando colocamos as dependências, a cada atualização desses componentes o useEffect é executado

    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand> 

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos"
                        onClick={() => handleTagSelected("all")}
                        $isactive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                $isactive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas Notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}  //Quando o componente é gerado por uma estrutura de repetição, por padrão temos que inserir uma KEY.
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    } 

                </Section>

            </Content>

            <NewNote to="/new">
                <FiPlus />
                    Criar Nota

            </NewNote>


        </Container>

    )
}