import React, { useState, useEffect } from "react";
import initialProducts from "./initialProducts.json";
import "./App.css";

function Navbar() {
  return (
    <div className="navbar no-highlight">
      <h1>Cachanflas Store</h1>
    </div>
  );
}

function SearchBar({
  onSearchChange,
  onSearchButtonClick,
  onClearSearch,
  searchInput,
}) {
  return (
    <div className="search-bar no-highlight">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search goods or services here..."
          onChange={onSearchChange}
          value={searchInput}
        />
        <button type="button" onClick={onSearchButtonClick}>
          Search Now!
        </button>
        <button type="button" onClick={onClearSearch}>
          Clear Search
        </button>
      </div>
    </div>
  );
}
function Product({ product, onDelete, onEdit, isOwnerView, onPurchase }) {
  // Function to render filled, half-filled, and empty stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar ? "½" : ""}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="product">
      <img src={product.img} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Seller: {product.seller}</p>
      {/* Render the stars based on the product's rating */}
      <div className="product-rating">{renderStars(product.rating)}</div>
      {isOwnerView && (
        <>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </>
      )}
      {!isOwnerView && (
        <button onClick={() => onPurchase(product.id)}>Purchase</button>
      )}
    </div>
  );
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {number === "..." ? (
              <span>...</span>
            ) : (
              <a
                onClick={() => paginate(number)}
                href="#!"
                className="page-link"
              >
                {number}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProductForm({ onSave, productToEdit, setProductToEdit }) {
  const [product, setProduct] = useState(
    productToEdit || { title: "", price: "", seller: "", img: "", rating: "" }
  );

  useEffect(() => {
    // When editing, populate the form with the existing product details, including the rating
    setProduct(
      productToEdit || { title: "", price: "", seller: "", img: "", rating: "" }
    );
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...product,
      id: product.id || Date.now(),
      rating: parseFloat(product.rating) || 0, // Make sure to parse the rating as a float
    });
    setProduct({ title: "", price: "", seller: "", img: "", rating: "" }); // Reset form after save
    setProductToEdit(null); // Exit edit mode
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="seller"
        value={product.seller}
        onChange={handleChange}
        placeholder="Seller"
        required
      />
      <input
        name="img"
        value={product.img}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating" // Placeholder text for rating
        step="0.1" // Allow decimal ratings
        min="0"
        max="5"
        value={product.rating}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Product</button>
      {productToEdit && (
        <button type="button" onClick={() => setProductToEdit(null)}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

function OwnerView({
  products,
  onSave,
  onDelete,
  onEdit,
  productToEdit,
  setProductToEdit,
}) {
  return (
    <div className="owner-view">
      <ProductForm
        onSave={onSave}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
      />
      <div className="product-grid">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
            isOwnerView={true}
          />
        ))}
      </div>
    </div>
  );
}

function ClientView({ products }) {
  const handlePurchase = (productId) => {
    // This is a placeholder function to simulate a purchase
    alert(`Product with ID ${productId} has been purchased.`);
  };

  return (
    <div className="client-view">
      <div className="product-grid">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            isOwnerView={false}
            onPurchase={handlePurchase}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts.length > 0 ? storedProducts : initialProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput(""); // Clear the input field
    setSearchQuery(""); // Clear the search query to show all results
    setCurrentPage(1); // Optional: Reset to the first page
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const saveProduct = (newProduct) => {
    if (productToEdit) {
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
    } else {
      setProducts([newProduct, ...products]);
    }
    setProductToEdit(null);
  };

  const deleteProduct = (productId) => {
    const newProducts = products.filter((product) => product.id !== productId);
    setProducts(newProducts);

    // Check if there are no items on the current page after deletion
    if (currentPage > 1 && newProducts.length <= indexOfFirstItem) {
      setCurrentPage(currentPage - 1);
    }
  };

  const editProduct = (product) => {
    setProductToEdit(product);
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar
        onSearchChange={handleSearchInputChange}
        onSearchButtonClick={handleSearchButtonClick}
        onClearSearch={handleClearSearch}
        searchInput={searchInput}
      />
      <button
        className="switch-button no-highlight"
        onClick={() => setIsOwner(!isOwner)}
      >
        Switch to {isOwner ? "Client" : "Owner"} View
      </button>
      {isOwner ? (
        <OwnerView
          products={currentItems}
          onSave={saveProduct}
          onDelete={deleteProduct}
          onEdit={editProduct}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
        />
      ) : (
        <ClientView products={currentItems} />
      )}
      {filteredProducts.length > itemsPerPage && ( // Condition to display pagination
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default App;
