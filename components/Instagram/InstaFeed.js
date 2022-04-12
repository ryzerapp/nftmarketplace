import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import http from '../../utils/http'
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { useRouter } from 'next/router';
import { useModalAction, useModalState } from '../ui/modal/modal.context';
import formatDate from '../../utils/formatDate';

import { Accordion } from 'react-bootstrap';

// export default function EditAuction( data ) {
export default function InstaFeed() {

    const {
        data
    } = useModalState();
    const { closeModal } = useModalAction();

    console.log('state data', data);
    let { feed } = data;

    const router = useRouter()

    return (
        <>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header> post</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            id: {feed.id}
                        </div>
                        <div >
                            <img style={{ width: '300px', height: '300px' }} src={feed.media_url} />
                        </div>
                        <div>
                            username: {feed.username}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Toaster></Toaster>
        </>
    )
}






// import React from "react";
// import Link from "next/link";
// import formatDate from "../../utils/formatDate";

// const InstaFeed = ({
//     feed
// }) => {
//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-12 pt-10">
//                         <div className="section-title">
//                             <h3>id</h3>
//                             <h3 className="pt-10">{feed?.id}</h3>
//                         </div>
//                         <hr></hr>
//                         <div className="row">
//                             <div className="col-lg-6 col-6">
//                                 <div className="item-details-user">
//                                     <h3>Caption</h3>
//                                     <div className="content">
//                                         <span>{feed?.caption}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                         <hr></hr>


//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default InstaFeed;
