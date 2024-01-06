import React from 'react';
import { Routes, Route } from 'react-router-dom';

import School from './pages/school/school';
import Personal from './pages/personal/personal';
import Design from './pages/design/design';

const Router = () => {
  return (
 <>
<Routes>
<Route path="/" element= {<School/>}/>
<Route path="/personal" element= {<Personal/>}/>
<Route path="/design" element= {<Design/>}/>
</Routes>
</>
  );
};

export default Router;
