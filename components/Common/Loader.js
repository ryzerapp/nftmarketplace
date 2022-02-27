import React from 'react'
import { Watch } from 'react-loader-spinner';
const Loader = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex pb-70 pt-70 justify-content-center' >
                        <Watch
                            height="100"
                            width="100"
                            color='grey'
                            ariaLabel='loading'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader;