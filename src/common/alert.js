import {  notification } from 'antd';
import logo from '../Images/logo.png'

const useAlert = () => {
const [api, contextHolder] = notification.useNotification();
const info = (header,description) => {
  api.info({
    message: header,
    description:description,
    placement:'bottomRight',
    showProgress: true,
    pauseOnHover:'true',
  });
};

const success = (description) => {
  api.success({
    message: 'Success',
    description:description,
    placement:'bottomRight',
    showProgress: true,
    pauseOnHover:'true',
  });
};
  
const error = (description) => {
api.error({
  message: 'Error',
  description:description,
  placement:'bottomRight',
  showProgress: true,
  pauseOnHover:'true',
});
};

const warning = (description) => {
  api.warning({
    message: 'Warning',
    description:description,
    placement:'bottomRight',
    showProgress: true,
    pauseOnHover:'true',
  });
};

const notifications = ({title,description,cancel =false}) => {
  api.info({
    icon: <img class="w-10 h-10 rounded-full bg-white " style={{ width:24, height:24}} src={logo} alt="Rounded avatar" />,
    message: title,
    description:description,
    placement:"top",
    showProgress: true,
    pauseOnHover:'true',
    duration: 20,
    style:{ backgroundColor: cancel ?'#fecdd3':'#fdba74'}
  });
};

return {contextHolder,info,success,error, warning, notifications}
};

export default useAlert;