import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ProductList products={products} />

      <Button variant="contained">Add Product</Button>
    </>
  );
};

export default Catalog;
