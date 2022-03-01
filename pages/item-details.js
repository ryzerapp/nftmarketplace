import React from 'react'
import ItemDetailsDescription from '../components/ItemDetails/ItemDetailsDescription'
import Layout from '../components/Layout/Layout'

export default function ItemDetails({ data }) {
    return (
        <Layout>
            <div className="item-details-area pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <ItemDetailsDescription data={{
                            name: "Cryptonium #32",
                            description: "This is",
                            author: "Mehul",
                            nft: "af4556c12cc21f989a8a79964d26290f877bf536",
                            edition: 32,
                            attributes: [
                                {
                                    trait_type: "Background",
                                    value: "Black"
                                },
                                {
                                    trait_type: "BackBorder",
                                    value: "16"
                                },
                                {
                                    trait_type: "MainBody",
                                    value: "KDKLA"
                                },
                                {
                                    trait_type: "SubBody",
                                    value: "JDawj"
                                },
                                {
                                    trait_type: "Eyeeee",
                                    value: "4"
                                },
                                {
                                    trait_type: "Head",
                                    value: "7"
                                },
                                {
                                    trait_type: "Dots",
                                    value: "WIHDa"
                                }
                            ],
                            image: "https://theproart.s3.ap-south-1.amazonaws.com/yrgneUzs9"
                        }} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
