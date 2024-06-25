import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const loading = () => {

    const override = {
        display: "block",
        margin: "25% auto",
    };

  return (
    <ClipLoader
        color='#3b82f6'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default loading
