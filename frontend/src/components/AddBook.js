import { useEffect, useState } from "react";

export default function AddBook() {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [msgType, setMsgType] = useState(null); // "success" or "error"

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    isFeatured: false,
    isOnSale: false,
    discountPercent: "",
    category: "",
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //const res = await fetch("http://localhost:3000/category/getCategories");
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        //setCategories(Array.isArray(data) ? data : data?.categories || []);
        setCategories(data?.data || []);
      } catch (error) {
        console.error("❌ Failed to load categories", error);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => { 
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg(null);
      setMsgType(null);
    }, 6000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // cleanup in case component unmounts
  }, [msg]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files?.[0] || null;
      setFormData((p) => ({ ...p, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (
      !formData.title ||
      !formData.author ||
      !formData.description ||
      !formData.price ||
      !formData.stock
    ) {
      setMsg("All fields (title,author,descriptin,price,stock)are required.");
      return;
    }
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("author", formData.author);
    fd.append("description", formData.description);
    fd.append("price", String(formData.price));
    fd.append("stock", String(formData.stock));
    if (formData.category) fd.append("category", formData.category);
    fd.append("isFeatured", String(formData.isFeatured));
    fd.append("isOnSale", String(formData.isOnSale));
    if (formData.coverImage) fd.append("coverImage", formData.coverImage);

    try {
      setSubmitting(true);
      //const res = await fetch("http://localhost:3000/books/createBook", {
      const res = await fetch("http://localhost:3000/admin/books", {
        method: "POST",
        body: fd,
        credentials: "include", // VERY IMPORTANT: send cookies with request
        //headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.message || data?.error || "Failed to create book"
        );
      }
      setMsg("✅ Book added successfully!");
      setMsgType("success");

      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        stock: "",
        isFeatured: false,
        isOnSale: false,
        discountPercent: "",
        category: "",
      });
      setPreview(null);
    } catch (error) {
      alert(error.message); // 👈 Simple alert for admin
      setMsg("❌ Failed to add book: " + error.message);
      setMsgType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-left">
        Add a New Book
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full p-6 space-y-4" // remove bg-gray-50 and shadow
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1 text-left">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter book title"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-1 text-left">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-left">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter book description"
          ></textarea>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-left">
              Price (TND)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g. 45"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-left  ">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g. 120"
              required
            />
          </div>
        </div>

        {/* isFeatured & isOnSale */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isOnSale"
              checked={formData.isOnSale}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            On Sale
          </label>
        </div>

        {/* Discount Percent */}
        {formData.isOnSale && (
          <div>
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g. 10"
            />
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          >
            <option value="" disabled hidden>
              -- Select a category --
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}{" "}
              </option>
            ))}
          </select>
        </div>
        {/* Image */}
        <div className="flex items-center space-x-4">
          <label className="font-medium">Book Image:</label>

          <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition">
            Upload
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <div>
            {preview && (
              <img
                src={preview}
                alt={formData.title}
                className="w-32 h-32 object-cover rounded"
              />
            )}
            {formData.coverImage && (
              <span className="text-gray-700 truncate max-w-xs">
                {formData.coverImage.name}
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition "
        >
          Add Book
        </button>
      </form>
      {msg && (
        <div
          className={`mt-4 p-3 rounded-md text-center font-medium transition-opacity duration-500 ${
            msgType === "success"
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          }`}
          style={{ opacity: msg ? 1 : 0 }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
