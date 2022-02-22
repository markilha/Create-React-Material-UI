

import React,{ useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UtilContext } from '../Contexts/util';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){ 
  const {signed,loading} = useContext(UtilContext);

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }
  return(
    <Route
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  )
}