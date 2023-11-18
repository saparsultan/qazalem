import { Flex, Spin } from "antd";

export default async function Loading() {
  return (
    <div className="loader">
      <Flex gap="middle" vertical>
        <Spin tip="Qaz Alem..." size="large">
          <div className="content" />
        </Spin>
      </Flex>
    </div>
  );
}
