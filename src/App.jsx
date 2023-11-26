import React, { useState, useEffect } from "react";
import "./App.css";

function Navbar() {
  return (
    <div className="navbar">
      <h1>Cachanflas Store</h1>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-container">
        <input type="text" placeholder="Search goods or services here..." />
        <button type="button">Search Now!</button>
      </div>
    </div>
  );
}

function Product({ product, onDelete, onEdit, isOwnerView }) {
  return (
    <div className="product">
      <img
        src={product.img}
        alt={product.title}
        sizes="100px"
        className="product-image"
      />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Seller: {product.seller}</p>
      {isOwnerView && (
        <>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </>
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
    productToEdit || { title: "", price: "", seller: "", img: "" }
  );

  useEffect(() => {
    setProduct(productToEdit || { title: "", price: "", seller: "", img: "" });
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
    });
    setProduct({ title: "", price: "", seller: "", img: "" }); // Reset form after save
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
  return (
    <div className="client-view">
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product.id} product={product} isOwnerView={false} />
        ))}
      </div>
    </div>
  );
}
const initialProducts = [
  {
    id: 1,
    title: "Vintage Leather Bag",
    price: "150",
    seller: "Alice",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    title: "Antique Wooden Chair",
    price: "250",
    seller: "Bob",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    title: "Handcrafted Wooden Bowl",
    price: "75",
    seller: "Charlie",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    title: "Silver Necklace",
    price: "100",
    seller: "Diana",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    title: "Organic Honey",
    price: "15",
    seller: "Eve",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    title: "Artisan Coffee Beans",
    price: "22",
    seller: "Frank",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 7,
    title: "Vintage Wool Scarf",
    price: "45",
    seller: "Grace",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    title: "Leather Wallet",
    price: "80",
    seller: "Henry",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    title: "Ceramic Vase",
    price: "60",
    seller: "Isabella",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 10,
    title: "Stainless Steel Water Bottle",
    price: "30",
    seller: "Jack",
    img: "https://via.placeholder.com/100",
  },
];

for (let i = 11; i <= 50; i++) {
  initialProducts.push({
    id: i,
    title: `Product ${i}`,
    price: (Math.random() * 100).toFixed(2), // Random price
    seller: `Seller ${i}`,
    img: `https://via.placeholder.com/100?text=Product+${i}`, // Placeholder image
  });
}

function App() {
  const [products, setProducts] = useState(() => {
    // Get products from localStorage or use initial products
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  const [isOwner, setIsOwner] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 5x5 grid

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const saveProduct = (newProduct) => {
    if (productToEdit) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
    } else {
      // Add new product at the beginning of the array
      setProducts([newProduct, ...products]);
    }
    setProductToEdit(null); // Clear editing state
  };

  const deleteProduct = (productId) => {
    // Find the index of the product to be deleted
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    // Calculate the current page's first index
    const firstIndexOfCurrentPage = (currentPage - 1) * itemsPerPage;

    // Check if the product is the only one on the last page
    if (
      productIndex === firstIndexOfCurrentPage &&
      (products.length - 1) % itemsPerPage === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }

    // Delete the product from the array
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const editProduct = (product) => {
    setProductToEdit(product);
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <button onClick={() => setIsOwner(!isOwner)}>
        Switch to {isOwner ? "Client" : "Owner"} View
      </button>
      {isOwner ? (
        <OwnerView
          products={currentItems} // Use currentItems for OwnerView
          onSave={saveProduct}
          onDelete={deleteProduct}
          onEdit={editProduct}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
        />
      ) : (
        <ClientView products={currentItems} /> // Use currentItems for ClientView
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
