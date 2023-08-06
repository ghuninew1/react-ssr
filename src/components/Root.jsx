import { Suspense, Outlet } from 'react';
import Themes from './Themes';
import Spinner from './Spinner';
import NavBar from './NavBar';

export default function Root() {
    return (
      <Themes>
        <div className="App">
        <NavBar />
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </Themes>
    );
  }