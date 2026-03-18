// TawkWidget.js
import { useEffect } from "react";

const TawkWidget = ({ tawkSrc="https://embed.tawk.to/69b8b3b92c788c1c3c2391e1/1jjsns31t", user }) => {
  useEffect(() => {
    // Don't load again if already loaded
    if (window.Tawk_API) return;

    // Setup global visitor info before script loads
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    if (user) {
      window.Tawk_API.visitor = {
        name: user.name,
        email: user.email,
      };
    }

    const script = document.createElement("script");
    script.src =tawkSrc;
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      // Cleanup Tawk API and iframe on logout
      if (window.Tawk_API) {
        window.Tawk_API = undefined;
      }
      const iframe = document.querySelector("iframe[id^='tawk']");
      if (iframe) iframe.remove();
      if (script) document.body.removeChild(script);
    };
  }, [tawkSrc, user,localStorage.getItem("token")]);

  return null;
};

export default TawkWidget;
