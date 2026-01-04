import React, { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books") // updated route
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookList(data);
        } else if (Array.isArray(data.data)) {
          setBookList(data.data); // if you wrap in {data: [...]}
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);


  const featuredBooks = bookList.filter((book) => book.isFeatured === true);

  return (
    <div className="mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        🌟 Featured Products
      </h3>

      {featuredBooks.length === 0 ? (
        <p className="text-gray-500">No featured products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={`http://localhost:3000/images/${book.coverImage}`}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h6 className="font-semibold text-lg mb-1 text-gray-800">
                  {book?.title}
                </h6>
                <span className="text-gray-500 mb-2">{book?.author}</span>
                <strong className="text-primary text-lg mt-auto">
                  ${book?.price}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
