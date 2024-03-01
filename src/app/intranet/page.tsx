import './page.css'
import HomeMainBanner from './componentes/home/home-main-banner';
import TopNews from './componentes/home/top-news';
import Events from './componentes/home/events';
import Birthdays from './componentes/home/birthdays';
import Articles from './componentes/home/articles';

export default function IntranetPage(){

    return(

            <div className="w-full">

            {/** Parte superior del home - Banner principal y Noticias **/}
            <div className="main-container">

                    <div className="basis-1/2 flex grow p-6">
                        
                        <HomeMainBanner></HomeMainBanner>

                    </div>

                    <div className="flex flex-col justify-between basis-1/4 p-2">

                        <TopNews></TopNews>

                    </div>

            </div>

            {/** Segunda sección del home - Eventos y Cumpleaños **/}
            <div className="main-container">

                    <div className="flex flex-col w-[50%]  p-4">

                        <div className="w-full min-w-full h-48 rounded-2xl bg-white p-4">

                            <Events></Events>

                        </div>
                        
                        <div className="w-full min-w-full grow h-36 rounded-2xl bg-white p-4 mt-4">

                            <Birthdays></Birthdays>

                        </div>

                    </div>

                    <div className="flex grow p-4">

                        <div className="w-full min-w-full h-auto rounded-2xl bg-white"> 

                            <Articles></Articles>

                        </div>

                    </div>

            </div>

            {/** Tercera sección del home - Herramientas y Normativas */}
            <div className="main-container">

            </div>
            </div>

    );

}