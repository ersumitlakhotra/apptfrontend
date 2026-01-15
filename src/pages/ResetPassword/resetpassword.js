/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import useAlert from "../../common/alert";
import { apiCalls } from "../../hook/apiCall";
import { isValidEmail } from "../../common/cellformat";
import { LoadingOutlined, LockFilled, MailFilled } from '@ant-design/icons';
import { Drawer, Spin, Input, Button } from 'antd';
import CountdownTimer from "../../common/countTimer";
import { Textbox } from "../../common/textbox";

export const ResetPassword = ({ logo }) => {
  const { contextHolder, success, error, warning } = useAlert();
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [cid, setCid] = useState(0);
  const [uid, setUid] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [codeEnter, setCodeEnter] = useState('');
  const [openVerification, setOpenVerification] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const onSubmit = async () => {
    if (email !== '' && isValidEmail(email)) {
      setLoading(true);
      try {
        const body = JSON.stringify({ email: email });
        const res = await apiCalls('POST', 'company/isExist', null, null, body);
        if (res.status === 200 && res.data.data !== null) {
          if (Boolean(res.data.data.active)) {
            let name = res.data.data.name;
            setCid(res.data.data.id);
            setUid(res.data.data.uid);
            sendEmail(name);
            setOpenVerification(true);
          }
          else
            error('Your account is deactivated and cannot access the application. Please contact our help desk!')
        }
        else {
          warning('Could not find that email address, Sorry.');
        }
      } catch (err) {
        error(String(err.message))
      }
      setLoading(false);
    }
    else {
      warning('Please, fill out the required fields !');
    }

  }
  const sendEmail = async (business_name) => {
    const newCode = Math.floor(100000 + Math.random() * 900000);
    const Subject = `${process.env.REACT_APP_PROJECT_NAME} Verification Code`;

    let message = '<p>Hi ' + business_name + '</p>';
    message += '<p>Please enter the following verification code to reset your account password.</p><br/>';
    message += '<p><big><b>' + newCode + ' </b></big></p>';
    message += `<p>In case you were not trying to reset your account password & are seeing this email, please contact us at ${process.env.REACT_APP_SUPPORT_EMAIL}</p>`;

    const emailMessage = JSON.stringify({
      to: email,
      subject: Subject,
      message: message,
    });
    await apiCalls('POST', 'sendverification', null, null, emailMessage);
    saveCode(newCode, business_name);
  }

  const saveCode = (newCode, business_name) => {
    setBusinessName(business_name)
    setCode(newCode.toString());
    setCodeEnter('');
  }
  const reset = () => {
    setBusinessName('');
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setCode('');
    setCodeEnter('');
    setUid(0);
    setCid(0);
    setOpenVerification(false);
    setOpenPassword(false);
  }
  const onVerify = () => {
    if (code === codeEnter) {
      setOpenVerification(false);
      setOpenPassword(true);
    }
    else {
      error(`Hmm, that's not a valid verification code. Please double-check your email and try again!`)
    }
  }
  const updatePassword = async () => {
    if (newPassword === confirmPassword) {
      setLoading(true);
      try {
        const body = JSON.stringify({ id:uid.toString(),password: newPassword});
        const res = await apiCalls('PUT', 'company/security', cid, null, body);
        if (res.status === 200) {
         
          reset();
          success('Your password has been changed successfully.');
        }
        else {
          warning(res.message);
        }
      } catch (err) {
        error(String(err.message))
      }
      setLoading(false);
      
    }
    else {
      error(`Password mismatch!`)
    }
  }

  const onChange = text => {
    setCodeEnter(text.toString());
  };

  const sharedProps = {
    onChange
  };
  return (
    <div class="bg-gray-50 h-screen py-4">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       <img class="w-20 h-20 mb-2" src={logo} alt="logo" />
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password
            </h1>
            <p class="block mb-2 text-sm font-small text-gray-700 dark:text-white">
              Please enter the admin email address and we'll send you a verification code to reset your password.
            </p>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email address</label>
              <input type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" onClick={() => onSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Request verification code</button>
            <div>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
              </p>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Feel free to  <a href="/support" target="_blank" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Contact us</a>
              </p>
            </div>
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
        onClose={() => {setOpenVerification(false); reset();}} >
        <div class='w-full flex flex-col justify-center gap-4 items-center '>
          <MailFilled style={{ fontSize: 32, color: 'green' }} />
          <p class='text-2xl  font-sans text-gray-600 border-b border-gray-400 pb-6 px-12 '>VERIFY YOUR EMAIL ADDRESS</p>
          <p class='font-medium'>A verification code has been sent to : {email}</p>
          <p>Please check your inbox and enter the verification code below to verify your email address.</p>
          <div class='flex flex-row gap-1 text-sm font-bold mb-3'><p>The code will expire in : </p><CountdownTimer code={code} setCode={setCode} /></div>

          <Input.OTP size='large' status={code !== codeEnter && codeEnter.length === 6 ? "error" : ""} formatter={str => str.toUpperCase()} {...sharedProps} />

          <Button color="cyan" variant="solid" size='large' style={{ width: '400px' }} onClick={() => onVerify()} >
            Verify
          </Button>
          <Button color="cyan" variant="link" onClick={() => sendEmail(businessName)}>
            Resend code
          </Button>


        </div>
      </Drawer>

      {/* Reset Password drawer*/}
      <Drawer title={"Reset Password"} placement='bottom' height={'80%'} style={{ backgroundColor: '#F9FAFB' }} open={openPassword}
        onClose={() => {setOpenPassword(false); reset();}} >
        <div class='w-full flex flex-col justify-center gap-4 items-center '>
          <LockFilled style={{ fontSize: 32, color: 'green' }} />
          <p class='text-2xl  font-sans text-gray-600 border-b border-gray-400 pb-6 px-12 '>CHANGE YOUR PASSWORD</p>
          <p class='mb-4'>Enter a new password below to change your password</p>
          <Textbox className={'w-96'} type={'password'} label={'New Password'} isRequired={true} value={newPassword} setValue={setNewPassword} />
          <Textbox className={'w-96'} type={'password'} label={'Confirm Password'} isRequired={true} value={confirmPassword} setValue={setConfirmPassword} />
          <Button color="cyan" variant="solid" size='large' style={{ width: '400px' }} onClick={() => updatePassword()} >
            Reset Password
          </Button>


        </div>
      </Drawer>


      {contextHolder}
    </div>
  );
};


export default ResetPassword;