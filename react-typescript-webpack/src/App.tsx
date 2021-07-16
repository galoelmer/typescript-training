import "./style.css";
import image from "./banner.png";

export const App = () => {
  return (
    <>
      <h1>React Typescript Webpack Starter Template {process.env.mode}</h1>
      <img src={image} alt="banner" />
    </>
  );
};
