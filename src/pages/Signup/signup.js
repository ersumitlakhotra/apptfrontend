/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { LoadingOutlined, MailFilled } from '@ant-design/icons';
import { Drawer, Spin,Input, Button } from 'antd';
import { apiCalls } from "../../hook/apiCall.js";
import useAlert from "../../common/alert.js";
import { getAdminPermission, isValidEmail, setCellFormat } from "../../common/cellformat.js";
import CountdownTimer from "../../common/countTimer.js";

export const Signup = ({ logo }) => {
  const [business_name, setBusinessName] = useState('');
  const [cell, setCell] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { contextHolder, success, error, warning } = useAlert();
  const [code, setCode] = useState('');
  const [codeEnter, setCodeEnter] = useState('');
  const [openVerification, setOpenVerification] = useState(false);

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000);
    setCode(newCode.toString());
  }

  const onSubmit = async () => {
    if (business_name !== '' && cell !== '' && cell.length === 12 && email !== '' && isValidEmail(email) && password !== '') {
      setLoading(true);
      try {
        const body = JSON.stringify({email: email});
        const res = await apiCalls('POST', 'company/isExist',null,null, body);
        if (res.status === 200 && res.data.data === null) {
            sendEmail();
            // generateCode();
            setOpenVerification(true);            
        }
        else {
          warning('An account with that information is already exists. Try again or create a new account with different details. ');
        }
      } catch (e) { }
      setLoading(false);
    }
    else {
      warning('Please, fill out the required fields !');
    }

  }
  const sendEmail = async() => {
     generateCode();
          const Subject = "Appoint Stack Verification Code";

          let message = '<p>Hi ' + business_name + '</p>';
          message += '<p>Please enter the following verification code to create you account.</p><br/>';
          message += '<p><big><b>' + code + ' </b></big></p>';
          message += '<p>In case you were not trying to create your account & are seeing this email, please contact us at info@appointstack.com</p>';

          const emailMessage = JSON.stringify({
            to: email,
            subject: Subject,
            message: message,
          });
          await apiCalls('POST', 'sendverification',null,null, emailMessage);
  }
  const RegisterNewCompany = async () => {
    if(code === codeEnter)
    {
    setLoading(true);
    try {
      const body = JSON.stringify({
        name: business_name,
        email: email,
        cell: cell,
        password: password,
        slot: 45,
        timinginfo: [{
          monday: ['09:00:00', '21:00:00', true],
          tuesday: ['09:00:00', '21:00:00', true],
          wednesday: ['09:00:00', '21:00:00', true],
          thursday: ['09:00:00', '21:00:00', true],
          friday: ['09:00:00', '21:00:00', true],
          saturday: ['09:00:00', '21:00:00', true],
          sunday: ['09:00:00', '21:00:00', true],
        }]
      });

      const res = await apiCalls('POST', 'company',null,null, body);
      if (res.status === 201) {
        const cid = res.data.data.id;
        try {
          const userBody = JSON.stringify({
            fullname: 'Admin',
            cell: cell,
            email: email,
            gender: 'Male',
            username: email,
            password: password,
            role: 'Administrator',
            rating: '5',
            permissioninfo: getAdminPermission(),
            status: 'Active',
            accounttype: 'Basic'
          });
          const resUser = await apiCalls('POST', 'user',cid,null, userBody);
          if (resUser.status === 201) {
            reset();
            success('Congratulation, your account has been successfully created.');
          }
          else
            error(resUser.response.data.error)
        } catch (error) {
          error(error.message)
        }

      }
      else {
        if (String(res.response.data.error).toLocaleLowerCase().includes("duplicate key"))
          warning('An account with that information is already exists. Try again or create a new account with different details. ');
        else
          error(String(res.response.data.error))
      }
    }
    catch (err) {
      error(String(err.message))
    }
    finally {
      setLoading(false);
    }
  }
  }

  const reset = () => {
    setBusinessName('');
    setCell('');
    setEmail('');
    setPassword('');
    setCode('');
  }

  const onChange = text => {
    setCodeEnter(text.toString());
  };
 const onInput = value => {
    setCodeEnter('');
  };
  const sharedProps = {
    onChange,
    onInput
  };

  return (
    <section class="bg-gray-50 ">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <a href="#" class="flex items-center mb-6 mt-12 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-10 h-8 mr-2" src={logo} alt="logo" />
          {process.env.REACT_APP_PROJECT_NAME}
        </a>
        <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>
            <p class="block mb-2 text-sm font-small text-gray-700 dark:text-white">
              Create an account to start managing your appointments and build your remote team.
            </p>
            <div>
              <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business name <span class='text-red-500'>*</span></label>
              <input type="text" name="company" id="company" value={business_name}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Business Name" required onChange={(e) => setBusinessName(e.target.value)} />
            </div>
            <div>
              <label for="cell" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cell number <span class='text-red-500'>*</span></label>
              <input type="tel" name="cell" id="cell" value={cell}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="(111)-222-3333" required onChange={(e) => setCell(setCellFormat(e.target.value))} />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span class='text-red-500'>*</span></label>
              <input type="email" name="email" id="email" value={email}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span class='text-red-500'>*</span></label>
              <input type="password" name="password" id="password" placeholder="••••••••" value={password}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => onSubmit()} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>

            <p class="block mb-2 text-center text-xs font-small text-gray-500 dark:text-white">
              By signing up to create an account, you are accepting our terms of service and privacy policy
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999, // Ensure it's on top
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}

      <Drawer title={""} placement='bottom' height={'80%'} style={{ backgroundColor: '#F9FAFB' }} open={openVerification} 
      onClose={() => setOpenVerification(false)} >
        <div class='w-full flex flex-col justify-center gap-4 items-center '>
          <MailFilled style={{ fontSize: 32, color: 'green' }} />
          <p class='text-2xl  font-sans text-gray-600 border-b border-gray-400 pb-6 px-12 '>VERIFY YOUR EMAIL ADDRESS</p>
          <p class='font-medium'>A verification code has been sent to : {email}</p>
          <p>Please check your inbox and enter the verification code below to verify your email address.</p>
          <div class='flex flex-row gap-1 text-sm font-bold mb-3'><p>The code will expire in : </p><CountdownTimer code={code} setCode={setCode} /></div>
         
          <Input.OTP size='large' status={ code !== codeEnter && codeEnter.length === 6 ? "error" : ""} formatter={str => str.toUpperCase()} {...sharedProps} />
         
          <Button color="cyan" variant="solid" size='large' style={{width:'400px'}} onClick={() => RegisterNewCompany()}>
            Verify
          </Button>
          <Button color="cyan" variant="link" onClick={() => sendEmail()}>
            Resend code
          </Button>


        </div>
      </Drawer>

      {contextHolder}
    </section>
  );
};


export default Signup;