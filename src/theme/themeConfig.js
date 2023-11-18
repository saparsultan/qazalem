const theme = {
  token: {
    fontSize: 16,
    colorPrimary: "#e3871c",
    fontVariantNumeric: "lining-nums proportional-nums!important",
  },
  components: {
    Button: {
      colorPrimary: "#e3871c",
      algorithm: true, // Enable algorithm
    },
    Input: {
      // fontSizeSM: 20,
      // colorPrimary: "#eb2f96",
      // height: "auto",
      fontVariantNumeric: "lining-nums proportional-nums",
      algorithm: true, // Enable algorithm
    },
    Form: {
      algorithm: true,
      Item: {
        colorPrimary: "#eb2f96",
        color: "#fff",
        algorithm: true, // Enable algorithm
      },
    },
    Select: {
      color: "#fff",
      algorithm: true,
    },
  },
};
export default theme;
