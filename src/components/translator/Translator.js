import './Translator.css';
import axios from 'axios';
import { countries } from '../../data/countries';
import { useEffect, useState } from 'react';

const Translator = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [translateTo, setTranslateTo] = useState('en');
    const [detectedLanguage, setDetectedLanguage] = useState('en');

    const translate = async () => {
        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
                'api-version': '3.0',
                'to[0]': translateTo,
                textType: 'plain',
                profanityAction: 'NoAction',
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key':
                    '7388e1da32msh99cdb4a7d126c59p19b691jsna4d1053ac4ac',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            },
            data: [
                {
                    Text: inputText,
                },
            ],
        };

        try {
            const response = await axios.request(options);
            const data = response.data;
            const translatedText = data[0].translations[0].text;
            console.log(data);
            setOutputText(translatedText);
            setDetectedLanguage(data[0].detectedLanguage.language);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='text-input'>
                    <textarea
                        spellCheck='false'
                        className='from-text'
                        placeholder='Enter text'
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                    ></textarea>
                    <textarea
                        spellCheck='false'
                        readOnly
                        disabled
                        className='to-text'
                        placeholder='Translation'
                        value={outputText}
                    ></textarea>
                </div>
                <ul className='controls'>
                    <li className='row from'>
                        <div className='icons'>
                            <i className='fas fa-volume-up'></i>
                            <i className='fas fa-copy'></i>
                        </div>
                        <select>
                            {countries.map((country, i) => {
                                let selected;
                                if (
                                    country.value.includes(
                                        `${detectedLanguage}-`
                                    ) &&
                                    country.value.startsWith(detectedLanguage)
                                ) {
                                    selected = true;
                                } else {
                                    selected = false;
                                }
                                return (
                                    <option
                                        key={i}
                                        value={country.value}
                                        selected={selected ? selected : null}
                                    >
                                        {country.name}
                                    </option>
                                );
                            })}
                        </select>
                    </li>
                    <li className='exchange'>
                        <i className='fas fa-exchange-alt'></i>
                    </li>
                    <li className='row to'>
                        <select>
                            {countries.map((country, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={country.value}
                                        onClick={(e) => {
                                            setTranslateTo(country.value);
                                        }}
                                    >
                                        {country.name}
                                    </option>
                                );
                            })}
                        </select>
                        <div className='icons'>
                            <i className='fas fa-volume-up'></i>
                            <i className='fas fa-copy'></i>
                        </div>
                    </li>
                </ul>
            </div>
            <button onClick={translate}>Translate Text</button>
        </div>
    );
};

export default Translator;
