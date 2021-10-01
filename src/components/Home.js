import React from 'react'
import { AddNote } from './AddNote';
import { Notes } from './Notes';

export default function Home(props) {


    return (
        <>
            <AddNote mode = {props.mode} />
            <Notes mode = {props.mode} />
        </>
    )
}
