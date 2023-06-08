import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[] | null>();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products) {
    return <>Loading...</>;
  }

  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add Product</Button>
    </>
  );
};

export default Catalog;
