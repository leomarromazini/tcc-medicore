import { ConfigProvider, Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';

type CardButtonProps = ButtonProps;

export default function Button({ children, type, ...rest }: CardButtonProps) {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorTextLightSolid: '#0A5053',
              colorPrimary: '#3DD5F0',
              colorPrimaryHover: '#44cae2df',
              //colorPrimaryTextHover: "green"
            },
          },
        }}
      >
        <AntButton type={type} {...rest}>
          {children}
        </AntButton>
      </ConfigProvider>
    </>
  );
}
