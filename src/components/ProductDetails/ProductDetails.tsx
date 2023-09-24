import { ProductDetailsProps } from "./ProductDetails.types";
import { StyledPageContainer } from "../../styledComponents/PageContainer";
import styled from "styled-components";
import { Fragment } from "react";

const StyledHeadingThree = styled.h3`
  font-size: 1.625rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const StyledHeadingOne = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledHeadingTwo = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-top: 1rem;
`;

const StyledProdDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const StyledImage = styled.img`
  height: 10rem;
`;
const StyledDescription = styled.div`
  margin-top: 2rem;
`;

export default function ProductDetails(props: ProductDetailsProps) {
  return (
    <StyledPageContainer>
      {props.data.map((item, index) => {
        return (
          <Fragment key={index}>
            <StyledHeadingOne>{item.title}</StyledHeadingOne>
            <StyledProdDetailContainer>
              <div>
                <StyledHeadingThree>{item.category}</StyledHeadingThree>
                <StyledHeadingThree>SKU:{item.sku}</StyledHeadingThree>
                <StyledHeadingTwo>${item.price}</StyledHeadingTwo>
              </div>
              <div>
                <StyledImage src={item.image} />
              </div>
            </StyledProdDetailContainer>
            <StyledDescription>
              <p>{item.description}</p>
            </StyledDescription>
          </Fragment>
        );
      })}
    </StyledPageContainer>
  );
}
