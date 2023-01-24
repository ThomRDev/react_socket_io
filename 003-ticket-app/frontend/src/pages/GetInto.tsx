import {
  SaveOutlined
} from '@ant-design/icons';
import { Button, Form, Input,InputNumber,Typography,Divider } from 'antd';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { getUserStorage } from '../helpers/getUserStorage';
import { useHideMenu } from '../hooks/useHideMenu';
const { Title,Text } = Typography

export const GetInto = () => {

  const navigate = useNavigate()
  useHideMenu(false)
  const onFinish = (values: any) => {
    console.log('Success:', values);
    localStorage.setItem('agent',values.agent_name)
    localStorage.setItem('desktop',values.desktop)
    navigate('/escritorio')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [user] = useState(getUserStorage())

  if(user.agent && user.desktop){
    return <Navigate  to={'/escritorio'} />
  }

  return (
    // ant design trabaja con 24 columnas
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agent_name"
          rules={[{ required: true, message: 'Ingrese el nombre del agente' }]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item
          label="Escritorio"
          name="desktop"
          rules={[{ required: true, message: 'Ingrese el numero del escritorio' }]}
        >
          <InputNumber min={1} max={99} />
          {/* <Input.Password /> */}
        </Form.Item>
      
        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button 
          type="primary" htmlType="submit">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
