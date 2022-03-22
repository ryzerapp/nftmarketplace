import React from "react";
import formatDate from "../../utils/formatDate";
import { useForm } from "react-hook-form";
import http from '../../utils/http'
import toast from 'react-hot-toast';
import { useQueryClient } from "react-query";
const notify = (message) => toast(message);
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";

const schema = yup
	.object({
		cryptoCost: yup
			.number('Price must be provided in Number.')
			.min(1, "Price Must be greater then zero")
			.required("Price must be provided.")
	})
	.required();


const AuctionDetailsDescription = ({
	data,
}) => {
	const queryClient = useQueryClient()
	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			cryptoCost: 0
		},
		resolver: yupResolver(schema),
	}
	);
	const onSubmit = async (formData) => {
		if (parseInt(data?.start_bid) >= parseInt(formData?.cryptoCost)) {
			toast.error(`Your Bid Is Less then Start Bid`);
			return;
		}
		else if (data?.highest_bid) {
			if (parseInt(data?.highest_bid) >= parseInt(formData?.cryptoCost)) {
				toast.error(`Some Bid Price is already more then your bid price.Please Enter Greater then Highest Bid`);
				return;
			}
		}
		let dataTemp = { ...formData, nfts: data?.nfts[0]?.id, auction: data?.id };
		try {
			await http.post('/bids', dataTemp).then(async (res) => {
				if (res?.status == 201) {
					notify("Bid Added.")
					queryClient.invalidateQueries(`auctions${data?.id}`)
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
							<h3 style={{ color: 'white' }}>Description</h3>
							<span 	>{data?.description}</span>
						</div>
						<hr></hr>
						<div className="item-details-price">
							<div className="item-details-title">
								<h3>Edition : {data?.nfts[0]?.edition}</h3>
							</div>
							<ul>
								<li>
									Created
									<b>: {formatDate(data?.nfts[0]?.created_at ? data?.nfts[0]?.created_at : new Date())}</b>
								</li>
								<li>
									Total Likes:
									<b>: {data?.nfts[0]?.total_like ? data?.nfts[0]?.total_like : 0}</b>
								</li>
								<li>
									Total Bookmark:
									<b>: {data?.nfts[0]?.total_bookmark ? data?.nfts[0]?.total_bookmark : 0}</b>
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
									Highest Bid
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
													type='number'
													{...register("cryptoCost")}
													className='form-control'
													placeholder='e. g. 12'
												/>
												<ErrorMessage
													errors={errors}
													name="cryptoCost"
													render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
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
