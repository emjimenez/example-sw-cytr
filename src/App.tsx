import React from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar bg-base-300">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <div className="flex-1 px-2 mx-2">Star Wars wiki</div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            <li><Link to="people">Characters</Link></li>
            <li><Link to="planets">Planets</Link></li>
            <li><Link to="starships">Star ships</Link></li>
            <li><Link to="favourites">Favourites</Link></li>
          </ul>
        </div>
      </div>
      <div className="m-6">
        <Outlet />
      </div>
    </div> 
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
        <li><Link to="people">Characters</Link></li>
        <li><Link to="planets">Planets</Link></li>
        <li><Link to="starships">Star ships</Link></li>
        <li><Link to="favourites">Favourites</Link></li>
      </ul>
    </div>
  </div>
  );
}

export default App;
