import {  notification } from 'antd';

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

return {contextHolder,info,success,error, warning}
};

export default useAlert;