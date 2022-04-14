import Layout from "../components/Layout/Layout";
import SearchEngine from './search-engine';
import Subscribe from '../components/Common/Subscribe'
const Index = () => {
	return (
		<Layout>
			<SearchEngine />
			<Subscribe />
		</Layout>
	);
};
export default Index;
