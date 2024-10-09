/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice.js";
import { addToCartAsync } from "../../cart/CartSlice.js";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(""); // State to handle the selected image
  const { id } = useParams();
  const loggedIn = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data?.images?.[0]); // Set initial image
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Update the main image when a thumbnail is clicked
  };
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      dispatch(
        addToCartAsync({
          product: product.id,
          quantity: 1,
          user: loggedIn.id,
        })
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Product Images */}
        <div className="w-full md:w-1/3">
          {/* Display Selected Image */}
          <img
            src={selectedImage}
            alt={product?.title}
            className="w-full h-auto object-cover rounded-lg mb-4"
          />

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product?.title} - ${index}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  selectedImage === image
                    ? "border-2 border-blue-500"
                    : "border border-gray-300"
                }`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="w-full md:w-2/3">
          {/* Product Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 mt-2">{product.category}</p>

          <p className="text-xl mt-2 text-gray-700 dark:text-gray-300 mb-4">
            {product?.description}
          </p>
          <p className="text-lg font-semibold text-green-600 mb-4">
            ₹ {product?.price?.toFixed(2)}
          </p>

          <div className="flex items-center mb-4">
            <span className="font-semibold text-gray-600 dark:text-gray-300">
              Rating:
            </span>
            <span className="ml-2 text-yellow-500">
              ⭐ {product?.rating?.toFixed(2)}
            </span>
          </div>

          <p
            className={`text-sm font-semibold mb-4 ${
              product?.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product?.availabilityStatus} ({product?.stock} in stock)
          </p>

          <div className="space-y-4">
            <p className="text-sm">
              Brand: <span className="font-medium">{product?.brand}</span>
            </p>
            <p className="text-sm">
              SKU: <span className="font-medium">{product?.sku}</span>
            </p>
            <p className="text-sm">
              Weight: <span className="font-medium">{product?.weight}g</span>
            </p>
            <p className="text-sm">
              Dimensions:{" "}
              <span className="font-medium">
                {product?.dimensions?.width}cm (W) x{" "}
                {product?.dimensions?.height}cm (H) x{" "}
                {product?.dimensions?.depth}cm (D)
              </span>
            </p>
            <p className="text-sm">
              Minimum Order Quantity:{" "}
              <span className="font-medium">
                {product?.minimumOrderQuantity}
              </span>
            </p>
            <p className="text-sm">
              Warranty:{" "}
              <span className="font-medium">
                {product?.warrantyInformation}
              </span>
            </p>
            <p className="text-sm">
              Shipping:{" "}
              <span className="font-medium">
                {product?.shippingInformation}
              </span>
            </p>
            <p className="text-sm">
              Return Policy:{" "}
              <span className="font-medium">{product?.returnPolicy}</span>
            </p>
          </div>

          {/* Buy Now and Add to Cart Buttons */}
          <div className="mt-6 space-x-4">
            <button
              onClick={() => handleBuyNow(product)}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Buy Now
            </button>
            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information: Tags */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {product?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
