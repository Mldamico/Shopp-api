import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect } from "react";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending")) {
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
