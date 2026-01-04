import React, { useEffect, useState } from "react";

export default function AllBooks() {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ featured: false, onSale: false });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/books", {
          method: "GET",
          credentials: "include", // if you need cookies
        });

        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();

        if (data.success) {
          setBookList(data.data); // backend returns { success, data: [...] }
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  const filteredBooks = bookList.filter((book) => {
    const checks = [
      !filter.featured || book.isFeatured,
      !filter.onSale || book.isOnSale,
      // You can easily add more filters here like:
      // !filter.category || book.category === filter.category
    ];

    // Only include the book if all checks pass
    return checks.every(Boolean);
  });

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">All Books</h3>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-medium transition ${
            filter.featured
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setFilter({ ...filter, featured: !filter.featured })}
        >
          Featured
        </button>

        <button
          className={`px-4 py-2 rounded-full font-medium transition ${
            filter.onSale
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setFilter({ ...filter, onSale: !filter.onSale })}
        >
          On Sale
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
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
                {book.title}
              </h6>
              <span className="text-gray-500 mb-2">{book.author}</span>
              <strong className="text-primary text-lg mt-auto">
                ${book.price}
              </strong>
              {book.isFeatured && (
                <span className="text-green-600 font-semibold">Featured</span>
              )}
              {book.isOnSale && (
                <span className="text-red-600 font-semibold ml-2">On Sale</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
