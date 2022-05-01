import React, { useState } from 'react'
import ItemDetailsDescription from '../../components/ItemDetails/ItemDetailsDescription'
import Layout from '../../components/Layout/Layout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Feed from '../../components/Feed';
import axios from 'axios'
// Instagram App ID
// 1159992498093707

// Instagram App Secret
// 707d7dbc4c88df3ac5551226ba8aee4f

// tester account token
// IGQVJWU3FHajJ3S192Umk3MFplYUl5VWQ2NWZApb0JmSkg2VVgwSzJiWm03NzgwQWxreEdURTlSU2JVR1VMaHB6cWNiSm91VGJ6OTlxU1hpWkNTYVVOQjY5MkEzWnotUlRDLTJSMU5TRmhoSVpVZATlGMAZDZD

export default function Insta() {
    const [feeds, setFeedsData] = useState([])
    const router = useRouter()
    // let code = router.query['code'] || '';
    // console.log('code :', code);
    // console.log('query code :', router.query);

    let instaAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
    let token = 'AQDzffhEfI33HbHhJABWkECWb8g-jHeaqFWL9zzQda_yDPvKvcWxWVfS2rubMNP0x011zMc2JcqN65STKLr0L58pcFLwUsXuz99aAbjWFo2q18zToCLb4wlZTunP7T7tCIlD96wLqRkPIqTECp8phWrEdizmexG1T0yByvImoDK3bz18vW5KX__jxO1wdDtd1U7bHK6UIUsm2D2sCRSTyJrLm8-BbgKvgnM5kfmpEHNdog'



    // async function fetchInstagramPost() {
    //     try {
    //         axios
    //             .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=10&access_token=${token}`)
    //             .then((resp) => {
    //                 console.log('response data', resp);
    //                 setFeedsData(resp.data.data)
    //             })
    //     } catch (err) {
    //         console.log('error', err)
    //     }
    // }


    return (
        <Layout>
            <div className="item-details-area pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <Link href={instaAuthUrl}>Enter into my feeds</Link>
                        {/* <button onClick={instagramAuth}>insta</button> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
