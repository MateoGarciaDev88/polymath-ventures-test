import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import apiCharacters from '../Api/api-characters';
import { HotKeys } from "react-hotkeys";
import _, { map } from 'underscore';
import './Characteres.css';

const Characters = () => {

    const navigate = useNavigate();

    const [characters, setCharacters] = useState([]);
    const [characterId, setCharacterId] = useState(0);
    const [isSelected, setIsSelected] = useState(false);
    const [hover, setHover] = useState(false);

    const getCharacters = async () => {
        try {
            const { results } = await apiCharacters.getAllCharacters();
            const array1 = results.splice(0, (results.length / 3));
            const array2 = results.splice(0, (results.length));

            const array1Filter = array1.map(x => {
                return {
                    ...x,
                    isNew: true,
                    active: true
                }
            })

            

            const array2Filter = array2.map(x => {
                return {
                    ...x,
                    image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
                    active: false
                }
            })

            const arrayCharacters = [
                ...array1Filter,
                ...array2Filter
            ]

            setCharacters(_.shuffle(arrayCharacters));
            console.log(arrayCharacters)
        } catch (error) {
            console.log(error);
        }
    }

    const getCharactersById = async (charId) => {
        try {
            const { id } = await apiCharacters.getCharactersById(charId);
            setCharacterId(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleMouseEnter = (id) => {
        setHover(true);
        getCharactersById(id);
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    const selectCharacter = (id, active) => {
        if (active) {
            let newArray = characters.map(x => {
                if (x.id === id) {
                    x.isNew = false;
                }
                return { ...x };
            })
            setCharacters(newArray);
            navigate(`/character/${id}`);
        }
    }

    const keyMap = {
        MOVE_UP: { name: 'Move square up', sequence: 'up' },
        MOVE_DOWN: "down",
        MOVE_LEFT: "left",
        MOVE_RIGHT: "right"
    };

    const handlers = {
        MOVE_UP: event => console.log("Move up hotkey called!"),
        MOVE_DOWN: event => console.log("Move down hotkey called!"),
        MOVE_LEFT: event => console.log("Move left hotkey called!"),
        MOVE_RIGHT: event => console.log("Move right hotkey called!")
    };


    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <HotKeys keyMap={keyMap} >
            <div className="main-container">
                <div className="title">
                    Select character
                </div>

                <div>
                    {
                        characters.map(({ id, name }) => (
                            <div key={id} className="character-name">
                                {
                                    id === characterId &&
                                    <div>
                                        {name}
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="contenedor">
                    <div className="grid-thumbnail">
                        {
                            characters.map(({ id, image, isNew, active }) => (
                                <div key={id} className="container-thumbnail" onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={handleMouseOut} onClick={() => selectCharacter(id, active)}>
                                    <div className="container-text-image">
                                        <HotKeys handlers={handlers} >
                                            <img src={image} className="image-thumbnail" />
                                            {
                                                isNew &&
                                                <div className="text">New</div>
                                            }
                                        </HotKeys>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        {
                            characters.map(({ id, image }) => (
                                <div className="container-character" >
                                    {
                                        id === characterId && hover &&
                                        <div key={id} className="container-select-character">
                                            <img src={image} />
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </HotKeys>
    )
}

export default Characters