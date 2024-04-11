import './page.css'
import HomeMainBanner from './componentes/home/home-main-banner';
import TopNews from './componentes/home/top-news';
import Events from './componentes/home/events';
import Birthdays from './componentes/home/birthdays';
import Articles from './componentes/home/articles';
import Repos from './componentes/home/repos';
import { Novedades } from './componentes/home/novedades';
import { Enterate } from './componentes/home/enterate';
import { Documentacion } from './componentes/home/documentacion';

export default function IntranetPage() {

    return (

        <div className="w-full">

            {/** Parte superior del home - Banner principal y Noticias **/}
            <div className="flex w-full flex-row">
                <div className="flex flex-col w-3/4 mt-4">

                    <HomeMainBanner></HomeMainBanner>

                    <TopNews></TopNews>

                    <Novedades></Novedades>

                </div>
                <div className="w-1/4 pl-7">

                    <Enterate></Enterate>

                    <Events></Events>

                    <Documentacion></Documentacion>

                </div>

            </div>

            {/** Nuestro Blog **/}
            <div className="w-full mt-4">

                <Articles></Articles>

            </div>

            {/** Nuestros documentos **/}
            <div className="w-full mt-4">

                <Repos></Repos>

            </div>

            {/** Tercera sección del home - Herramientas y Normativas */}
            <div className="main-container">

            </div>
        </div>

    );

}