import React from "react";
import { Route, Switch } from "react-router-dom";

// import NavigationNavPage from './pages/NavigationNavPage';
// import FormsNavPage from './pages/FormsNavPage';
// import TablesNavPage from './pages/TablesNavPage';
// import AddonsNavPage from './pages/AddonsNavPage';
// import ModalsNavPage from './pages/ModalsNavPage';
// import AdvancedNavPage from './pages/AdvancedNavPage';
// import ComponentsNavPage from './pages/ComponentsNavPage';

// FREE
// import AnimationPage from './pages/AnimationPage';
// import AlertPage from './pages/AlertPage';
// import HomePage from './pages/HomePage';
// import ButtonPage from './pages/ButtonPage';
// import CSSNavPage from './pages/CSSNavPage';
// import TablePage from './pages/TablePage';
// import TableResponsivePage from './pages/TableResponsivePage';
// import TableScrollPage from './pages/TableScrollPage';
// import TableStylesPage from './pages/TableStylesPage';
// import BadgePage from './pages/BadgePage';
// import BreadcrumbPage from './pages/BreadcrumbPage';
// import FaPage from './pages/FaPage';
// import DatatablePage from './pages/DatatablePage';
// import DatatablePageV5 from './pages/DatatablePage-2';
// import DatatableApiPage from './pages/DatatableApiPage';
// import ModalPage from './pages/ModalPage';
// import ModalFormPage from './pages/ModalFormPage';
// import ModalExamplesPage from './pages/ModalExamplesPage';
// import ProgressPage from './pages/ProgressPage';
// import InputPage from './pages/InputPage';
// import MediaPage from './pages/MediaPage';
// import JumbotronPage from './pages/JumbotronPage';
// import CardsPage from './pages/CardsPage';
// import PaginationPage from './pages/PaginationPage';
// import PopoverPage from './pages/PopoverPage';
// import ListGroupPage from './pages/ListGroupPage';
// import CarouselPage from './pages/CarouselPage';
// import PanelPage from './pages/PanelPage';
// import CollapsePage from './pages/CollapsePage';
// import TooltipsPage from './pages/TooltipsPage';
// import FooterPage from './pages/FooterPage';
// import MasksPage from './pages/MasksPage';
// import DropdownPage from './pages/DropdownPage';
// import VideoCarouselPage from './pages/VideoCarouselPage';
// import HoverPage from './pages/HoverPage';
// import FormsPage from './pages/FormsPage';
// import ChartsPage from './pages/ChartsPage';
// import SearchPage from './pages/SearchPage';
// import ValidationPage from './pages/ValidationPage';
// import NavbarPage from './pages/NavbarPage';
// import IframePage from './pages/IframePage';
// import EdgeHeaderPage from './pages/EdgeHeaderPage';
// import SpinnerPage from './pages/SpinnerPage';
// import MasonryPage from './pages/MasonryPage';
// import ScrollBarPage from './pages/ScrollBarPage';
// import NavsPage from './pages/NavsPage';
// import TabsPage from './pages/TabsPage';
// import PillsPage from './pages/PillsPage';
// import NotificationPage from './pages/NotificationPage';
// import InputGroupPage from './pages/InputGroupPage';
// import TreeviewPage from './pages/TreeviewPage';
// import RatingPage from './pages/RatingPage';

import Researchers from "./pages/Researches";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import UserSubscriptions from "./pages/UserSubscriptions";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Researchers} />
        <Route exact path="/researches" component={Researchers} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/my-subscriptions" component={UserSubscriptions} />
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
