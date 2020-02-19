import React from 'react'
import {useParams} from "react-router-dom"

//TODO find application-case metadata. include in render.
export function IdeaMapView() {
    let { contest } = useParams();

    return (
        <div>
            <h3>{decodeURIComponent(contest)}</h3>
        </div>
    );
}

