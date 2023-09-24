import { useEffect, useState } from "react";
import { StyledDropDownContainer } from "../../styledComponents/DropdownContainer";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { Close } from "@mui/icons-material";
import { BarchartProps } from "../Barchart/Barchart.types";
import { useAppContext } from "../../AppContext";
import { SelectChangeEvent } from "@mui/material";
import { useFetch } from "use-http";
import ProductDetails from "../ProductDetails";
import Barchart from "../Barchart";
import Productgrid from "../Productgrid";

export default function Home() {
  //state
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [productData, setProductData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState<string>("");
  const [productLabel, setProductLabel] = useState<string>("Products");
  const [chartData, setChartDataData] = useState<BarchartProps["data"]>([]);
  const [renderProductDetail, setRenderProductDetail] =
    useState<boolean>(false);
  const { categoryData } = useAppContext();

  //get products
  const { request, response } = useFetch("https://fakestoreapi.com");
  const getProducts = async () => {
    const products = await request.get(`/products/category/${currentCategory}`);
    if (response.ok) {
      products && setProductData(products);
      const chartDetails =
        products &&
        products?.map(
          (item: {
            title: string;
            price: number;
            rating: { rate: number };
          }) => {
            return {
              productTitle: item.title,
              price: item.price,
              rating: item.rating.rate,
            };
          }
        );
      setChartDataData(
        chartDetails.sort(
          (a: { price: number }, b: { price: number }) => a.price - b.price
        )
      );
    }
  };

  //handlers

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentCategory(event.target.value as string);
  };
  const handleProductChange = (event: SelectChangeEvent) => {
    setCurrentProduct(event.target.value as string);
    setRenderProductDetail(true);
  };
  const handleProductClick = () => {
    if (!productData.length) {
      setProductLabel("Please Select a category");
      setTimeout(() => {
        setProductLabel("Products");
      }, 3000);
    }
  };

  const handleCategoryClear = () => {
    setCurrentCategory("");
    setProductData([]);
  };
  const handleProductClear = () => {
    setCurrentProduct("");
    setRenderProductDetail(false);
  };

  //generate details
  const generateProductNames = () => {
    return (
      productData &&
      productData.map((product: { title: string }) => product.title)
    );
  };
  const generateTableDetails = () => {
    return (
      productData &&
      productData.map(
        (product: {
          title: string;
          price: number;
          description: string;
          rating: { rate: number };
        }) => {
          return {
            title: product.title,
            price: product.price,
            description: product.description,
            rating: product.rating.rate,
          };
        }
      )
    );
  };

  const generateProductDetails = (productName: string) => {
    const current =
      productData &&
      productData.filter(
        (item: { title: string }) => item.title === productName
      );
    return (
      current &&
      current.map(
        (product: {
          title: string;
          price: number;
          description: string;
          id: number;
          image: string;
          category: string;
        }) => {
          return {
            title: product.title,
            price: product.price,
            description: product.description,
            sku: product.id,
            image: product.image,
            category: product.category,
          };
        }
      )
    );
  };
  //Effects
  useEffect(() => {
    if (currentCategory) {
      getProducts();
    }
  }, [currentCategory]);
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ marginRight: "2rem" }}>
        <StyledDropDownContainer>
          <Dropdown
            options={categoryData && categoryData}
            handleChange={handleChange}
            value={currentCategory}
            label="Categories"
            sx={{ margin: "2rem", minWidth: "16rem", width: "20rem" }}
          />
          <Button
            onClick={handleCategoryClear}
            variant="contained"
            size="large"
            sx={{ height: "3.5rem" }}
          >
            <Close />
          </Button>
        </StyledDropDownContainer>
        <StyledDropDownContainer>
          <Dropdown
            onClick={handleProductClick}
            disabled={!productData.length}
            options={generateProductNames()}
            handleChange={handleProductChange}
            value={currentProduct}
            label={productLabel}
            sx={{ margin: "2rem", minWidth: "16rem", width: "20rem" }}
          />
          <Button
            disabled={!productData.length}
            onClick={handleProductClear}
            variant="contained"
            size="large"
            sx={{ height: "3.5rem" }}
          >
            <Close />
          </Button>
        </StyledDropDownContainer>
      </div>
      {renderProductDetail ? (
        <ProductDetails data={generateProductDetails(currentProduct)} />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {productData.length < 1 && currentCategory === "" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "15rem",
              }}
            >
              <h2 style={{ textAlign: "center" }}>Please Select a category</h2>
            </div>
          ) : (
            <div style={{ maxWidth: "93%" }}>
              <Barchart data={chartData} />
              <Productgrid data={generateTableDetails()} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
