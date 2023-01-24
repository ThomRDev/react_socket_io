
import {Row,Col,Typography,Button} from 'antd'
import {
  DownloadOutlined
} from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Ticket } from '../types/Ticket';
const { Text,Title } = Typography

export const CreateTicket = () => {
  
  useHideMenu(true)

  const { socket } = useContext(SocketContext)
  const [ticket, setTicket] = useState<Ticket | null>(null)

  const newTicket = () => {
    socket.emit('request-ticket',null,(ticket:Ticket)=>{
      setTicket(ticket)
    })
  }
  

  return (
    <>
      <Row>
        <Col span={14} offset={6} style={{ display:'grid',placeItems:'center' }}>
          <Title level={3}>Presione el boton para un nuevo ticket</Title>
          <Button
            type='primary'
            shape='round'
            size='large'
            icon={<DownloadOutlined />}
            onClick={newTicket}
          >Nuevo ticket</Button>
        </Col>
      </Row>
      {
        !!ticket && (
          <Row style={{marginTop:100}}>
            <Col span={14} offset={6} style={{ display:'grid',placeItems:'center' }}>
              <Text type='secondary' style={{ fontSize:20 }}>Su número</Text>
              <Text
                type='success'
                style={{ fontSize:55 }}
              >{ticket.number}</Text>
            </Col>
          </Row>
        )
      }
    </>
  )
}
