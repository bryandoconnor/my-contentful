import {useState, useEffect} from "react";

const {REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN} = process.env;

function useContentful(query) {
	let [data, setData] = useState(null);

	useEffect(() => {
		window
			.fetch(
				`https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${REACT_APP_CDA_TOKEN}`
					},
					body: JSON.stringify({query})
				}
			)
			.then(response => response.json())
			.then(json => setData(json.data));
	}, [query]);

	return {data};
}

export default useContentful;
