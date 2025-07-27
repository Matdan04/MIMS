import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            {...props} 
            src="/images/IMUIcon.jpg"
            alt="IMU Logo"
            // className="w-20 h-20" 
           
        />
    );
}