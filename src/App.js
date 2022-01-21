import React, {useState} from "react";
import Person from "./components/person";
import Bookmarks from "./components/bookmarks";
import useContentful from "./hooks/use-contentful.js";
import "./App.css";

const query = `
query ($isPreview: Boolean = false) {
  person(id: "7wpWeHFj7WaAncNhWUTg0K") {
    ...personFields
  }
  personPreview: person(id: "7wpWeHFj7WaAncNhWUTg0K", preview: $isPreview) @include(if: $isPreview) {
    ...personFields
  }
  allBookmarks: bookmarkCollection {
    items {
      ...bookmarkFields
    }
  }
  favoriteTagCollection: tagCollection(where: {title_contains: "Favorite"}, limit: 1) {
    items {
      title
      linkedFrom {
        bookmarkCollection {
          items {
            ...bookmarkFields
          }
        }
      }
    }
  }
}

fragment bookmarkFields on Bookmark {
  sys {
    id
  }
  title
  url
  comment
  tagsCollection(limit: 10) {
    items {
      title
    }
  }
}

fragment personFields on Person {
  name
  title
  bio {
    json
  }
  socialTwitter
  socialGithub
  socialLinkedin
  image {
    title
    url
  }
}

`;

function App() {
	let [isPreview, setIsPreview] = useState(false);
	let {data, errors} = useContentful(query, isPreview);

	if (errors)
		return (
			<span style={{color: "red"}}>
				{errors.map(error => error.message).join(",")}
			</span>
		);
	if (!data) return <span>Loading...</span>;

	const {favoriteTagCollection, person, personPreview} = data;
	const favoriteTag = favoriteTagCollection.items[0];

	return (
		<div className="sm:text-center">
			<div className="p-1">
				<label>
					<input
						className="mr-2"
						type="checkbox"
						checked={isPreview}
						onChange={() => setIsPreview(!isPreview)}
					/>
					Show Preview
				</label>
			</div>
			<div className="relative">
				{personPreview ? (
					<Person className="is-preview" person={personPreview} />
				) : (
					""
				)}
				<Person className="person" person={person} />
			</div>
			<Bookmarks
				bookmarks={favoriteTag.linkedFrom.bookmarkCollection.items}
				headline="My favorites"
			/>
		</div>
	);
}

export default App;
