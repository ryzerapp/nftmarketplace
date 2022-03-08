import dynamic from "next/dynamic";
const Tabs = dynamic(
	import("react-tabs").then((mod) => mod.Tabs),
	{ ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";
import Pagination from "./Pagination";
import NftCardWithTime from "./NftCardWithTime";
resetIdCounter();

const FeaturedArea = ({ title, pagination, data }) => {
	return (
		<>
			<div className="featured-area pt-100 pb-70">
				<div className="container">
					<div className="tab featured-tab-area">
						<div className="row align-items-center">
							<div className="col-lg-6 col-md-4">
								<div className="section-title">
									<h2>{title}</h2>
								</div>
							</div>
						</div>

						<Tabs>
							<div className="col-lg-6 col-md-8">
								<ul className="tabs">
									<TabList>
										<Tab>
											<a>All</a>
										</Tab>
									</TabList>
								</ul>
							</div>

							<div className="tab_content  pt-45">
								<TabPanel>
									<div className="tabs_item">
										<div className="row justify-content-center">
											{data && data.length > 0 ? data.map((nft) => {
												return (
													<NftCardWithTime
														data={nft}
														key={nft.id}
													/>
												);
											}) : <>
												<p>Please Wait for Some live Auction</p>
											</>}
										</div>
									</div>
								</TabPanel>
							</div>
						</Tabs>
					</div>
				</div>
				{pagination && <Pagination />}
			</div>
		</>
	);
};

export default FeaturedArea;
