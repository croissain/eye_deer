//External imports
import { useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { oAuthLogin } from '../../../redux/apiRequest';

const loadScript = (src) =>
    new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
})

const GoogleAuthButton = () => {
  const googleButton = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client';
    const id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current,
          { theme: 'outline', size: 'large' }
        )
        google.accounts.id.prompt(); // also display the One Tap dialog
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, []);

  function handleCredentialResponse(response) {
    const userObj = jwt_decode(response.credential);
    oAuthLogin(userObj, dispatch, navigate);
  }

  return (
    <div ref={googleButton}></div>
  )
}

export default GoogleAuthButton