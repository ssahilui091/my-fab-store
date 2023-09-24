import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import accessibility from "highcharts/modules/accessibility";
import { BarchartProps } from "./Barchart.types";
import Dropdown from "../Dropdown";
import { SelectChangeEvent } from "@mui/material";
import { StyledPaper } from "../../styledComponents/StyledPaper";

accessibility(Highcharts);

export default function Barchart(props: BarchartProps) {
  const [options, setOptions] = useState({
    chart: {
      type: "column",
      height: 350,
    },
    accessibility: {
      enabled: true,
    },
    title: {
      text: "Price comparison",
    },
    xAxis: {
      categories: props.data.map((item) => item.productTitle),
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: "Price",
        data: props.data.map((item) => item.price),
      },
    ],
  });
  const [selectedValue, setSelectedValue] = useState<string>("Price");
  const selectOptions = ["Price", "Rating"];
  const handleDropdownChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    if (selectedValue === "Price") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        yAxis: {
          title: {
            text: "Price",
          },
        },
        series: [
          {
            name: "Price",
            data: props.data.map((item) => item.price),
          },
        ],
      }));
    } else if (selectedValue === "Rating") {
      setOptions((prevOptions) => ({
        ...prevOptions,
        yAxis: {
          title: {
            text: "Rating",
          },
        },
        series: [
          {
            name: "Rating",
            data: props.data.map((item) => item.rating).sort((a, b) => a - b),
          },
        ],
      }));
    }
    setSelectedValue(selectedValue);
  };
  useEffect(() => {
    setSelectedValue("Price");
  }, [props.data]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xAxis: {
        categories: props.data.map((item) => item.productTitle),
      },
      series:
        selectedValue === "Price"
          ? [
              {
                name: "Price",
                data: props.data.map((item) => item.price),
              },
            ]
          : [
              {
                name: "Rating",
                data: props.data
                  .map((item) => item.rating)
                  .sort((a, b) => a - b),
              },
            ],
    }));
  }, [props.data, selectedValue]);
  return (
    <StyledPaper>
      <Dropdown
        label="Select Data"
        handleChange={handleDropdownChange}
        options={selectOptions}
        value={selectedValue}
        sx={{ margin: "2rem", minWidth: "16rem", width: "20rem" }}
      />
      <HighchartsReact
        allowChartUpdate
        highcharts={Highcharts}
        options={options}
      />
    </StyledPaper>
  );
}
