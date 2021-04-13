import { gql, useQuery } from "@apollo/client";

const getBooksQuery = gql`
  query {
    books {
      title
      author {
        name
      }
    }
  }
`;
const BookList = () => {
  const da = useQuery(getBooksQuery);
  console.log(da);

  const data = da.data;
  return (
    <div>
      <h1>Books</h1>
      {da.loading ? (
        <p>Loading books...</p>
      ) : (
        <ul>
          {data.books.map((book) => {
            return <li>{book.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
