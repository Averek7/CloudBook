import React from 'react'

export default function Alert(props) {

    const Capitalize = (word) => {
        let lower = word?.toLowerCase();
        return lower?.charAt(0)?.toUpperCase() + lower?.slice(1,word.length);
    }

    return (
        <div style={{height : "45px"}}>
        {props.alert && <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert" id="display">
            <strong>{Capitalize(props.alert.typ)} : </strong>{props.alert.msg}
        </div>}
        </div>
    )
}