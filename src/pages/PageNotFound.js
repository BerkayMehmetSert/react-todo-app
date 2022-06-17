import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function PageNotFound() {
	return (
		<>
			<Helmet>
				<title>😥Oops! Page not found</title>
			</Helmet>
			<div className={'page-not-container'}>
				<h1 className={'page-not-title'}>😥Oops! Page not found</h1>
				<Link to={'/'}>
					<button className={'btn-primary'}>Go to home page</button>
				</Link>
			</div>
		</>
	)
	
}

export default PageNotFound;