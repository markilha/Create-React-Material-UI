import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Lotes from '../pages/Lotes';


export default function Routes(){
  return(
    <Switch> 
      <Route exact path="/lotes" component={Lotes} isPrivate />
    </Switch>
  )
}