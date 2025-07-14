import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function ProductsPage() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [editId,setEditId] = useState(null)

  const handleNewClick = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const initialProducts = [
    { id: 1, title: "Shirt", price: 20 },
    { id: 2, title: "Shoes", price: 50 }
  ];

  const { storedValue, setValue } = useLocalStorage('products', initialProducts);

  useEffect(() => {
    setData(storedValue);
  }, [storedValue]);

  const handleSave = () => {
    let updatedProducts;
    if(editId){
      updatedProducts = data.map(product =>{
        if(product.id==editId){
          product={
            ...product,title,price
          }
        }
        return product;
      })
    }else{
      const newProduct = {
        id: Date.now(),
        title,
        price: parseFloat(price)
      };
      updatedProducts = [...data, newProduct];
    }
    setData(updatedProducts);
    setValue(updatedProducts);
    setTitle('');
    setEditId(null)
    setPrice('');
    closeModal();
  };

  const deleteProduct = (id) => {
    const products = data.filter(e => e.id !== id);
    setData(products);
    setValue(products);
  };

  const editProduct = (product)=>{
    setEditId(product.id)
    setTitle(product.title)
    setPrice(product.price)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between font-semibold text-blue-700 text-shadow-2xs text-2xl">
          <p>Quantity: {data.length}</p>
          <p>Total price: {data.reduce((sum,item)=>sum + Number(item.price),0)}</p>
        </div>
        <hr className="text-blue-800 mb-5 mt-5"/>
        <button
          onClick={handleNewClick}
          className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + New Product
        </button>

        <div className="space-y-4">
          {data.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg text-blue-800">{p.title}</p>
                <p className="text-gray-600">${p.price}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => editProduct(p)}
                  className="text-orange-500 hover:text-orange-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-2xl min-w-[320px] w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-5 text-blue-700">Create New Product</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-blue-500"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="border border-gray-300 p-2 rounded w-full mb-5 focus:outline-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                {editId?'Update':'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
