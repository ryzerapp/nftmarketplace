import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Feed from '../../components/Feed';
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';
import { Accordion, Card } from 'react-bootstrap';
import { MODAL_VIEWS, useModalAction } from '../../components/ui/modal/modal.context';

const accessTokenFunc = (data) => {
    let code = data?.code
    return axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/instagram/access-token`, { code: code })
};

const useAccessToken = () => {
    const queryClient = useQueryClient();
    return useMutation(accessTokenFunc, {
        onSuccess: (res) => {
            console.log('token obj', res.data)
        },
        onSettled: () => {
            // queryClient.invalidateQueries("USERTICKETSDETAILS");
        },
    });
};

// 7250691314972065


export default function Insta() {

    const [feeds, setFeeds] = useState()
    const [code, setCode] = useState(null)
    const [authorizationCode, setAuthorizationCode] = useState(null)
    const router = useRouter()
    const { openModal } = useModalAction();
    const { mutate, isLoading } = useAccessToken()

    console.log('query code :', router.query.code);
    // let code = router.query.code
    // if (router.query.code != null) {
    //     mutate(router.query.code)
    // }
    // let accessToken = 'IGQVJWNjREOGJ6UHZArajNCb3hXYktCcTBHN05OT1JQQ2gzSDlLR1ZAXWUlPaG9oa0FTWlZA2RXA1VkZA5VG5SUENVdEZAVRHZA1RG1RNUpNWm8xMWtiVjlhT0g5WFE0WEQzTUFWZA2lpUmJR';

    async function fetchDataFromToken(token) {
        console.log('imported token', token)
        let url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,caption&access_token=${token}`
        let res = await axios.get(url);
        console.log('feed data', res)
        setFeeds(res.data.data)
    }

    async function handleJoin(id) {
        let data = feeds.find(feed => feed.id === id)
        console.log('data', data);
        return openModal(MODAL_VIEWS.SHOW_INSTA_FEED, { feed: data });
    }

    async function fetchToken() {
        // let data = await axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/instagram/access-token`, { code: router.query.code })
        axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/instagram/access-token`, { code: router.query.code })
            .then(async (res) => {
                console.log('data of token :', res);
                let token = res.data.access_token;
                console.log('integrated token', token)
                let url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,caption&access_token=${token}`
                let res2 = await axios.get(url);
                console.log('feed data', res2)
                setFeeds(res2.data.data)
            })
    }

    return (
        <>
        <div>

        <button class="btn sm btn-primary" onClick={fetchToken}>
                Explore Feed
            </button>
            {
                feeds ?
                    (<>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {feeds.map((feed, key) => {
                                return (<>
                                    {/* <InstaFeed feed={feed}/> */}
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={feed.media_url} />
                                        <Card.Body>
                                            <Card.Title>{feed.id}</Card.Title>
                                            <Card.Text>
                                                {feed.caption}
                                            </Card.Text>
                                            <button variant="primary" onClick={() => handleJoin(feed?.id)} >open</button>
                                        </Card.Body>
                                    </Card>

                                </>)
                            })}
                            {console.log('ffff', feeds)}
                        </div>
                    </>)
                    : (<div style={{ color: 'white' }}>
                        Whoaaa, you are authenticated !!
                    </div>)
            }
        </div>
       

            {/* <Layout>
                <div className="item-details-area pt-100 pb-70">
                    <div className="container">
                        <div className="row">
                            {code ?
                                <>
                                    {feeds.map((feed) => (
                                        <Feed key={feed.id} feed={feed} />
                                    ))}
                                </>
                                : <Link href={instaAuthUrl}>hello</Link>
                            }
                        //     <button onClick={instagramAuth}>insta</button> 
                        </div>
                    </div>
                </div>
            </Layout> */}

        </>
    )
}
