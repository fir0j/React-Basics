import React from 'react';
import ReactDOM from 'react-dom';
import SocialNetwork from './script';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SocialNetwork />, document.getElementById('root'));

serviceWorker.unregister();
