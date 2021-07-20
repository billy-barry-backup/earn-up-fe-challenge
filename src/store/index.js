import { configureStore } from "@reduxjs/toolkit";
import settings from "../containers/Setting/settingsReducer";
import counter from "../containers/ExampleRedux/counterReducer";
import home from '../containers/Home/homeReducer';

export default configureStore({
  reducer: {
    settings: settings,
    counter: counter,
    home,
  },
});
