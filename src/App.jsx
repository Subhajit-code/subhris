import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./component/page/AppLayout";
import { FavouriteSong } from "./FavouriteSong";
import { Home } from "./Home";
import Search from "./Search";
import Upload from "./Upload";
import Admin from "./Admin";
import './App.css'
import { MusicProvider } from "./context/MusicContext";

const App = () => {
  const router = createBrowserRouter([
    {   
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/favourite",
          element: <FavouriteSong/>,
        },
        {
          path: "/search",
          element: <Search/>,
        },
        {
          path: "/upload",
          element: <Upload/>,
        },
        {
          path: "/admin",
          element: <Admin/>,
        },
      ],
    },
  ]);

  return (
    <MusicProvider>
      <RouterProvider router={router} />
    </MusicProvider>
  );
};

export default App;

