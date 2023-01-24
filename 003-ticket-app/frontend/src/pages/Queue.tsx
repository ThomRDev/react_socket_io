import {Typography,Row,Col,List,Card,Tag, Divider} from 'antd'
import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import getLast from '../helpers/getLast';
import { useHideMenu } from '../hooks/useHideMenu';
import { Ticket } from '../types/Ticket';

const {Title,Text} = Typography

// const data = [
//   {
//       ticketNo: 33,
//       escritorio: 3,
//       agente: 'Fernando Herrera'
//   },
//   {
//       ticketNo: 34,
//       escritorio: 4,
//       agente: 'Melissa Flores'
//   },
//   {
//       ticketNo: 35,
//       escritorio: 5,
//       agente: 'Carlos Castro'
//   },
//   {
//       ticketNo: 36,
//       escritorio: 3,
//       agente: 'Fernando Herrera'
//   },
//   {
//       ticketNo: 37,
//       escritorio: 3,
//       agente: 'Fernando Herrera'
//   },
//   {
//       ticketNo: 38,
//       escritorio: 2,
//       agente: 'Melissa Flores'
//   },
//   {
//       ticketNo: 39,
//       escritorio: 5,
//       agente: 'Carlos Castro'
//   },
// ];
export const Queue = () => {

  useHideMenu(true)

  const ref = useRef(true)

  const [tickets,setTickets] = useState<Ticket[]>([])
  const { socket } = useContext(SocketContext)

  useEffect(()=>{
    socket.on('assigned-ticket',payload => {
      setTickets(payload)
    })
    return ()=>{
      socket.off('assigned-ticket')
    }
  },[socket])

  useEffect(()=>{
    ref.current = true
    getLast()
      .then(data=>{
        if(ref.current){
          setTickets(data)
        }
      })
    return () => {
      ref.current = false
    }
  },[])

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List 
            dataSource={tickets.slice(0,3)}
            renderItem={item =>(
              <List.Item>
                <Card
                  style={{width:300,marginTop:16}}
                  actions={[
                    <Tag color='volcano'>{item.agent}</Tag>,
                    <Tag color='volcano'>Escritorio : {item.desktop}</Tag>,
                  ]}
                >
                  <Title>No {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List 
            dataSource={tickets.slice(3)}
            renderItem={item =>(
              <List.Item>
                <List.Item.Meta 
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type='secondary'>En el escritorio: </Text>
                      <Tag color='magenta'>{item.desktop}</Tag>
                      <Text type='secondary'>Agente: </Text>
                      <Tag color='volcano'>{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
