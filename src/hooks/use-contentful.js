import {useState, useEffect} from "react";

const {
	REACT_APP_SPACE_ID,
	REACT_APP_CDA_TOKEN,
	REACT_APP_CPA_TOKEN
} = process.env;

function useContentful(query, isPreview) {
	let [data, setData] = useState(null);
	let [errors, setErrors] = useState(null);

	useEffect(() => {
		window
			.fetch(
				`https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${
							isPreview ? REACT_APP_CPA_TOKEN : REACT_APP_CDA_TOKEN
						}`
					},
					body: JSON.stringify({query, variables: {isPreview}})
				}
			)
			.then(response => response.json())
			.then(({data, errors}) => {
				if (errors) setErrors(errors);
				if (data) setData(data);
			})
			.catch(error => setErrors([error]));
	}, [query, isPreview]);

	return {data, errors};
}

export default useContentful;
