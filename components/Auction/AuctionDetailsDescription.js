import React from "react";
import formatDate from "../../utils/formatDate";
import { useForm } from "react-hook-form";
import http from '../../utils/http'
import toast from 'react-hot-toast';
import { useQueryClient } from "react-query";
const notify = (message) => toast(message);
const AuctionDetailsDescription = ({
	data,
}) => {
	const { nfts } = data;
	const queryClient = useQueryClient()
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = async (data) => {
		let dataTemp = { ...data, nfts: nfts[0]?.id };
		console.log(dataTemp)
		try {
			await http.post('/bids', dataTemp).then(async (res) => {
				if (res?.status == 201) {
					notify("Bid Added.")
					queryClient.invalidateQueries(`bids_${nfts[0]?.id}`)
				}
				else {
					notify(res?.data?.message)
				}
			})
				.catch((err) => {
					notify(err?.response?.data?.message)
				});

		} catch (error) {
			const { data } = error.response.data;
			if (data) {
				notify(data[0].messages[0].message);
			}
		}
	};
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 pt-10">
						<div className="section-title">
							<h3>Description</h3>
							<span 	>{data?.description}</span>
						</div>
						<hr></hr>
						<div className="item-details-price">
							<div className="item-details-title">
								<h3>Edition : {nfts[0]?.edition}</h3>
							</div>
							<ul>
								<li>
									Created
									<b>: {formatDate(nfts[0]?.created_at ? nfts[0]?.created_at : new Date())}</b>
								</li>
								<li>
									Total Likes:
									<b>: {nfts[0]?.total_like ? nfts[0]?.total_like : 0}</b>
								</li>
								<li>
									Total Bookmark:
									<b>: {nfts[0]?.total_bookmark ? nfts[0]?.total_bookmark : 0}</b>
								</li>
							</ul>
						</div>
						<hr></hr>
						<div className="item-details-price">
							<div className="item-details-title">
								<h3>Bid Details</h3>
							</div>
							<ul>
								<li>
									Start Bid
									<b>: {data?.start_bid}</b>
								</li>
								<li>
									Heigest Bid
									<b>: {data?.highest_bid ? data?.highest_bid : "Not Placed Any Bid Yet"}</b>
								</li>
							</ul>
						</div>
						<hr></hr>
					</div>
					<div className='col-lg-12'>
						<div className='collection-form-area'>
							<div className='collection-form'>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='row'>
										<div className='col-lg-12'>
											<div className='form-group'>
												<label>Your Bid Amount</label>
												<input
													type='text'
													{...register("cryptoCost")}
													className='form-control'
													placeholder='e. g. 12'
												/>
											</div>
										</div>
									</div>
									<div className='col-lg-12 col-md-12 text-center'>
										<button
											className='default-btn border-radius-5'
										>
											Place Bid
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	);
};

export default AuctionDetailsDescription;
