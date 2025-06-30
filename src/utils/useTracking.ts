import { useEffect } from 'react';

interface TrackingConfig {
  ga4?: string;
  pixel?: string;
  gtm?: string;
}

const useTracking = () => {
  useEffect(() => {
    const fetchConfigAndInject = async () => {
      try {
        const response = await fetch('/config/config.json');
        if (!response.ok) {
          console.warn('Tracking config not found. Skipping script injection.');
          return;
        }
        const config: TrackingConfig = await response.json();

        // Google Tag Manager (si existe, es el preferido)
        if (config.gtm) {
          const script = document.createElement('script');
          script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${config.gtm}');`;
          document.head.appendChild(script);
          
          const noscript = document.createElement('noscript');
          noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtm}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
          document.body.insertBefore(noscript, document.body.firstChild);

        } else {
          // Si no hay GTM, inyectar GA4 y Pixel individualmente
          if (config.ga4) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4}`;
            document.head.appendChild(script);

            const inlineScript = document.createElement('script');
            inlineScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.ga4}');
            `;
            document.head.appendChild(inlineScript);
          }

          if (config.pixel) {
            const script = document.createElement('script');
            script.innerHTML = `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.pixel}');
              fbq('track', 'PageView');
            `;
            document.head.appendChild(script);
            
            const noscript = document.createElement('noscript');
            noscript.innerHTML = `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=${config.pixel}&ev=PageView&noscript=1"/>`;
            document.body.insertBefore(noscript, document.body.firstChild);
          }
        }
      } catch (error) {
        console.error('Error loading tracking config:', error);
      }
    };

    fetchConfigAndInject();
  }, []);
};

export default useTracking; 