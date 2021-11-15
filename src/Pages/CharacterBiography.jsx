import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import apiCharacters from '../Api/api-characters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import './Characteres.css';

const CharacterBiography = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [infoCharacter, setInfoCharacter] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [location, setLocation] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    const getCharactersById = async () => {
        try {
            const res = await apiCharacters.getCharactersById(id);
            console.log(res)
            setInfoCharacter(res);
            setOrigin(res.origin);
            setLocation(res.location);
            setEpisodes(res.episode);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCharactersById()
    }, [])

    return (
        <div className="main-container-biography">
            
            <a onClick={() => navigate("/")}><FontAwesomeIcon icon={faArrowLeft} /></a>
            

            <div className="title">
                {infoCharacter.name}
            </div>
            
            <div className="container-biography">
                <div>
                    <div className="character-biography-name">
                        Information
                    </div>
                    <div className="container-info">
                        <div className="character-info start">
                            <div>
                                Origin
                            </div>
                            <div>
                                Species
                            </div>
                            <div>
                                Gender
                            </div>
                            <div>
                                Location
                            </div>
                            <div>
                                Status
                            </div>
                            <div>
                                Episodes Appearance
                            </div>
                        </div>
                        <div className="character-info end">
                            <div>
                                {origin.name}
                            </div>
                            <div>
                                {infoCharacter.species}
                            </div>
                            <div>
                                {infoCharacter.gender}
                            </div>
                            <div>
                                {location.name}
                            </div>
                            <div>
                                {infoCharacter.status}
                            </div>
                            <div>
                                {episodes.length}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img src={infoCharacter.image} className="round-image" />
                </div>
            </div>
        </div>
    )
}

export default CharacterBiography
