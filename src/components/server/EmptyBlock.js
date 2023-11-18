import { Empty } from "antd";

export default function EmptyBlock({ description }) {
  return (
    <Empty
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      description={description}
    />
  );
}
