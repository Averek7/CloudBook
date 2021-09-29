import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/NoteContext'

export default function About() {
    const a  = useContext(NoteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            This is {a.state.name} and he is {a.state.level}
        </div>
    )
}
