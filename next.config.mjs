/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/login/recover-password', // ruta ignorada
          destination: '/', // ruta de destino
          permanent: false, // 
        },
        // {
        //   source: '/dashboard', // ruta ignorada
        //   destination: '/dashboard/achievements', // ruta de destino
        //   permanent: false, //
        // },
        // {
        //   source: '/dashboard/schedule-mobile-units', // ruta ignorada
        //   destination: '/dashboard/achievements', // ruta de destino
        //   permanent: false, //
        // },
        // {
        //   source: '/dashboard/register-schedule-mobile-units', // ruta ignorada
        //   destination: '/dashboard/achievements', // ruta de destino
        //   permanent: false, //
        // },
        // {
        //   source: '/dashboard/register-schedule-activities', // ruta ignorada
        //   destination: '/dashboard/achievements', // ruta de destino
        //   permanent: false, //
        // },
        // {
        //   source: '/dashboard/schedule', // ruta ignorada
        //   destination: '/dashboard/achievements', // ruta de destino
        //   permanent: false, //
        // },                  

      ];
    },
  };
  
  export default nextConfig;
