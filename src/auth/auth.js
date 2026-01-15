export const isAuthenticated = () => {
  return !!localStorage.getItem("cid");
};

const handleAuth = async () => {
    try {
      const res = await loginAuth(email, password);
      if (res.status === 200) {
        if (Boolean(res.data.data.active)) {
          setLocalStorageWithExpiry('cid', res.data.data.cid);
          setLocalStorageWithExpiry('uid', res.data.data.id);
          setLocalStorageWithExpiry('email', email, 1);
          setLocalStorageWithExpiry('password', password, 1);
          navigate("/main"); //success('Login Successfully'); 
        }
        else
          error('Your account is deactivated and cannot access the application. Please contact our help desk!')
      }
      else
        error('Login Failed. Invalid username or password.')
    }
    catch (err) {
      error(String(err.message))
    }
  }