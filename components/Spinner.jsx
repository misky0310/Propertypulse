import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading}) => {

    const override = {
        display: "block",
        margin: "25% auto",
        borderColor: "blue",
    };

    const color='#000000'

    return (
        <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Spinner
