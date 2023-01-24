import { Row, Col, Typography, Button, Divider } from "antd";
import { CloseCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUserStorage } from "../helpers/getUserStorage";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../types/Ticket";
const { Title, Text } = Typography;

export const Desktop = () => {
  useHideMenu(false);

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const [user] = useState(getUserStorage());

  if (!user.agent || !user.desktop) {
    return <Navigate to={"/ingresar"} />;
  }

  const exit = (event: React.MouseEvent<HTMLElement>) => {
    localStorage.clear();
    navigate("/ingresar");
  };
  const nextTicket = (event: React.MouseEvent<HTMLElement>) => {
    socket.emit("next-ticket", user, (ticket: Ticket) => {
      setTicket(ticket);
    });
  };
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success" style={{ fontWeight: "700" }}>
            {user.desktop}
          </Text>
        </Col>
        <Col span={4} style={{ display: "grid", placeItems: "center" }}>
          <Button type="primary" shape="round" danger onClick={exit}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={20}>
          {!!ticket && (
            <>
              <Text>Está atendiendo el ticket numero: </Text>
              <Text style={{ fontSize: 30 }} type="danger">
                {ticket?.number}
              </Text>
            </>
          )}
        </Col>
        <Col span={4} style={{ display: "grid", placeItems: "center" }}>
          <Button shape="round" type="primary" onClick={nextTicket}>
            Siguiente
            <ArrowRightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
