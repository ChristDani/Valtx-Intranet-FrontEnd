
import "./../globals.css";

export default function AuthenticationLayout( {children} : {children: React.ReactNode} ){

    
    return(

            <div className="flex flex-col justify-center w-full">
                {children}
            </div>

    );
}