import noteContext from './noteContext';

const noteState = (props) => {
    const state = {
        "name" : "Averek",
        "level" : "God Level"
    }
    return(
        <noteContext.provider value={state}>
            {props.children}
        </noteContext.provider>
    )
}

export default noteState;