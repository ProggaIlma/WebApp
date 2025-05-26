import { markAsAllReadAPI, markAsReadAPI, notificationsAPI } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";
import { Card, Flex, Spin, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";

const { Text } = Typography;

const NotificationPopup = ({ nHide, nOpen, notificationCount, setNotificationCount, handleNOpenChange }) => {
  const { axiosInstance } = useAxiosInstance();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [dataCount, setDataCount] = useState("");

  useEffect(() => {
    if (nOpen) {
      setIsLoading(true);
      axiosInstance({
        url: notificationsAPI,
        method: "GET",
        params: {
          page: 1,
          pageSize: 10,
        },
      })
        .then((res) => {
          const sortedData = res?.data?.data?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
          setNotificationList(sortedData);
          setDataCount(res?.data?.metadata?.totalItems);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          openNotificationWithIcon(
            "error",
            null,
            error?.response?.data?.errors[0] !== undefined ? error.response.data?.errors[0] : "Something went wrong",
            6
          );
        });
    }
  }, [nOpen, notificationCount]);

  useEffect(() => {
    setPage(1);
  }, [handleNOpenChange]);

  const markAsRead = (not_id) => {
    axiosInstance({
      url: markAsReadAPI,
      method: "PATCH",
      data: { not_id: not_id },
    })
      .then((res) => {
        openNotificationWithIcon("success", null, "Marked as read!", 4);
        setNotificationCount(notificationCount - 1);
      })
      .catch((error) => {
        setIsLoading(false);
        openNotificationWithIcon(
          "error",
          null,
          error?.response?.data?.errors[0] !== undefined ? error.response.data?.errors[0] : "Something went wrong",
          6
        );
      });
  };

  const markAllAsRead = () => {
    axiosInstance({
      url: markAsAllReadAPI,
      method: "PATCH",
    })
      .then((res) => {
        openNotificationWithIcon("success", null, "Marked all as read!", 4);
        setNotificationCount(0);
      })
      .catch((error) => {
        setIsLoading(false);
        openNotificationWithIcon(
          "error",
          null,
          error?.response?.data?.errors[0] !== undefined ? error.response.data?.errors[0] : "Something went wrong",
          6
        );
      });
  };

  const loadMore = () => {
    setMoreLoading(true);
    setPage(page + 1);
    axiosInstance({
      url: notificationsAPI,
      method: "GET",
      params: {
        page: page + 1,
        pageSize: 10,
      },
    })
      .then((res) => {
        setNotificationList((prev) =>
          [...prev, ...res?.data?.data].sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
        );
        setMoreLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        openNotificationWithIcon(
          "error",
          null,
          error?.response?.data?.errors[0] !== undefined
            ? error.response.data?.errors[0]
            : "Something went wrong in server",
          6
        );
      });
  };

  return (
    <div>
      {contextHolder}
      {isLoading ? (
        <Flex
          style={{
            width: 357,
            height: 150,
            marginBottom: "100px",
          }}
          align="center"
          justify="center"
        >
          {" "}
          <HomePageLoader />
        </Flex>
      ) : (
        <Fragment>
          <Flex
            style={{
              padding: "20px 10px",
              width: 380,
            }}
            justify="space-between"
          >
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>Notifications</Text>
            <Buttons
              btntyp="colored-btn"
              btntext={"Mark as read"}
              w={120}
              onClickFunc={markAllAsRead}
              btnColor={"#8A7CFF"}
            />
          </Flex>
          <div style={{ height: "450px", overflow: "auto" }}>
            {notificationList?.map((data, i) => (
              <Card
                key={i}
                style={{
                  width: 357,
                  maxHeight: 350,
                  boxShadow: data?.read ? "none" : "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #ECECED",
                  margin: "10px",
                }}
              >
                <Flex justify="space-between" align="flex-start">
                  <div style={{ maxHeight: "50px", overflow: "hidden", marginBottom: "5px" }}>
                    <Text
                      style={{
                        fontWeight: data?.read ? "normal" : "bold",
                        fontSize: "16px",
                        marginBottom: "10px",
                      }}
                    >
                      {data?.description}
                    </Text>
                  </div>
                </Flex>
                <Flex justify="end" style={{ paddingTop: "20px" }}>
                  <Buttons
                    btntyp="colored-btn"
                    btntext={"Read"}
                    w={80}
                    disabled={data?.read}
                    onClickFunc={() => markAsRead(data?.not_id)}
                    btnColor={"#8A7CFF"}
                  />
                </Flex>
              </Card>
            ))}
            {dataCount === notificationList?.length ? (
              ""
            ) : (
              <Flex style={{ marginTop: "20px" }} justify="center">
                {moreLoading ? (
                  <Spin size="default" style={{ marginBottom: "10px" }} />
                ) : (
                  <Buttons
                    btntyp="colored-btn"
                    btntext={"Load More"}
                    w={120}
                    onClickFunc={loadMore}
                    btnColor={"#8A7CFF"}
                  />
                )}
              </Flex>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default NotificationPopup;
