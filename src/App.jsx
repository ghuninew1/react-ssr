import {  Outlet, Link, useLoaderData, redirect  } from "react-router-dom";
// import { Home,About,Env } from "./pages"
import './App.css'
import { Suspense } from 'react';
import Themes from './components/Themes';
import Spinner from './components/Spinner';
// import NavBar from './components/NavBar';

export function App() {
  return (
    <Themes>
      <Suspense fallback={<Spinner />}>
        <div className="App">
          <h1>test</h1>
        </div>
      </Suspense>
    </Themes>
  )
}

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "dashboard",
        loader: dashboardLoader,
        element: <Dashboard />,
      },
      {
        path: "lazy",
        lazy: () => import("./lazy"),
      },
      {
        path: "redirect",
        loader: redirectLoader,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
];

function Layout() {
  return (
    <Themes>
      <h1>Test SSR</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/lazy">Lazy</Link>
          </li>
          <li>
            <Link to="/redirect">Redirect to Home</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </Themes>
  );
}

const sleep = (n = 500) => new Promise((r) => setTimeout(r, n));
const rand = () => Math.round(Math.random() * 100);

async function homeLoader() {
  await sleep();
  return { data: `Home loader - random value ${rand()}` };
}

function Home() {
  let data = useLoaderData();
  return (
    <div>
      <h2>Home</h2>
      <p>Loader Data: {data.data}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

async function dashboardLoader() {
  await sleep();
  return { data: `Dashboard loader - random value ${rand()}` };
}

function Dashboard() {
  let data = useLoaderData();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Loader Data: {data.data}</p>
    </div>
  );
}

async function redirectLoader() {
  await sleep();
  return redirect("/");
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}