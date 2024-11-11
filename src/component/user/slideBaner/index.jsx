import { useState, useEffect } from "react";

const SlideBanner = () => {
  const [images, setImages] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/product/getAllProduct"
        );
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        setImages(
          data.data
            .filter(
              (product) => product.bannerUrl && product.bannerUrl.length > 0
            )
            .map((product) => ({
              Urlbanner: product.bannerUrl
            }))
        );
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setImages([]);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="item-home">
      {images.length > 0 ? (
        <img
          src={images[counter]?.Urlbanner}
          alt={`slider-${counter}`}
          style={{
            marginTop: "8px",
            width: "100%",
            height: "300px",
            objectFit: "contain",
            borderRadius: "5px"
          }}
        />
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default SlideBanner;
